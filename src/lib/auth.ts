import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { userOperations, sessionOperations } from './database';
import { randomBytes } from 'crypto';
=======

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';
const SESSION_EXPIRES_HOURS = 24 * 7; // 7 days

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'client';
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: 'admin' | 'client';
  sessionId: string;
  iat?: number;
  exp?: number;
}

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

// Session utilities
export function generateSessionId(): string {
  return randomBytes(32).toString('hex');
}

export function generateShareToken(): string {
  return randomBytes(16).toString('hex');
}

// JWT utilities
export function createJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

// Authentication functions
export async function authenticateUser(email: string, password: string): Promise<{ user: AuthUser; token: string; sessionId: string } | null> {
  try {
    const user = userOperations.findByEmail(email);
    if (!user || !user.isActive) {
      return null;
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Create session
    const sessionId = generateSessionId();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + SESSION_EXPIRES_HOURS);

    sessionOperations.create({
      id: sessionId,
      userId: user.id,
      expiresAt: expiresAt.toISOString(),
      ipAddress: '', // Will be set from request
      userAgent: '' // Will be set from request
    });

    // Update last login
    userOperations.updateLastLogin(user.id);

    // Create JWT
    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };

    const token = createJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
      sessionId
    });

    return { user: authUser, token, sessionId };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function validateSession(token: string): Promise<AuthUser | null> {
  try {
    const payload = verifyJWT(token);
    if (!payload) {
      return null;
    }

    // Check if session exists and is valid
    const session = sessionOperations.findById(payload.sessionId);
    if (!session) {
      return null;
    }

    // Update last accessed
    sessionOperations.updateLastAccessed(payload.sessionId);

    // Get user info
    const user = userOperations.findById(payload.userId);
    if (!user || !user.isActive) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };
  } catch (error) {
    console.error('Session validation error:', error);
    return null;
  }
}

export function logout(sessionId: string): void {
  try {
    sessionOperations.delete(sessionId);
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export async function createUser(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: 'admin' | 'client';
}): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    // Check if user already exists
    const existingUser = userOperations.findByEmail(userData.email);
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Create user
    const result = userOperations.create({
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      role: userData.role || 'client',
      isActive: true
    });

    if (result.changes > 0) {
      const user = userOperations.findById(result.lastInsertRowid as number);
      if (user) {
        return {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          }
        };
      }
    }

    return { success: false, error: 'Failed to create user' };
  } catch (error) {
    console.error('Create user error:', error);
    return { success: false, error: 'Internal server error' };
  }
}

// Middleware helpers
export function requireAuth(allowedRoles?: ('admin' | 'client')[]): (user: AuthUser | null) => boolean {
  return (user: AuthUser | null): boolean => {
    if (!user) return false;
    if (allowedRoles && !allowedRoles.includes(user.role)) return false;
    return true;
  };
}

export function requireAdmin(): (user: AuthUser | null) => boolean {
  return requireAuth(['admin']);
}

export function requireClient(): (user: AuthUser | null) => boolean {
  return requireAuth(['client']);
}

// Cleanup expired sessions
export function cleanupExpiredSessions(): void {
  try {
    sessionOperations.cleanup();
  } catch (error) {
    console.error('Session cleanup error:', error);
  }
}

// Password reset token (simple implementation)
export interface PasswordResetToken {
  token: string;
  email: string;
  expiresAt: Date;
}

const passwordResetTokens = new Map<string, PasswordResetToken>();

export function createPasswordResetToken(email: string): string {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

  passwordResetTokens.set(token, { token, email, expiresAt });

  // Cleanup expired tokens
  passwordResetTokens.forEach((tokenData, key) => {
    if (tokenData.expiresAt < new Date()) {
      passwordResetTokens.delete(key);
    }
  });

  return token;
}

export function validatePasswordResetToken(token: string): string | null {
  const tokenData = passwordResetTokens.get(token);
  if (!tokenData || tokenData.expiresAt < new Date()) {
    passwordResetTokens.delete(token);
    return null;
  }
  return tokenData.email;
}

export function consumePasswordResetToken(token: string): void {
  passwordResetTokens.delete(token);
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    const email = validatePasswordResetToken(token);
    if (!email) {
      return { success: false, error: 'Invalid or expired reset token' };
    }

    const user = userOperations.findByEmail(email);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const hashedPassword = await hashPassword(newPassword);
    // TODO: Add password update method to userOperations
    // userOperations.updatePassword(user.id, hashedPassword);
    
    consumePasswordResetToken(token);
    return { success: true };
=======
  } catch (error) {
    console.error('Password reset error:', error);
    return { success: false, error: 'Internal server error' };
  }
}