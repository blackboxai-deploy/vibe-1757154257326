import Database from 'better-sqlite3';
import { hash } from 'bcryptjs';
import path from 'path';
=======

// Database interfaces
export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'admin' | 'client';
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface Album {
  id: number;
  title: string;
  description?: string;
  clientId: number;
  coverPhoto?: string;
  isPublic: boolean;
  allowDownloads: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  shareToken?: string;
}

export interface Photo {
  id: number;
  albumId: number;
  filename: string;
  originalName: string;
  title?: string;
  description?: string;
  filePath: string;
  thumbnailPath: string;
  fileSize: number;
  width: number;
  height: number;
  mimeType: string;
  uploadedAt: string;
  isFavorited: boolean;
  orderIndex: number;
  metadata?: string;
}

export interface Session {
  id: string;
  userId: number;
  expiresAt: string;
  createdAt: string;
  lastAccessed: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface SiteSettings {
  id: number;
  key: string;
  value: string;
  updatedAt: string;
}

// Initialize database
let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'photography.db');
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
=======
}

// Initialize database schema
export function initializeDatabase() {
  const database = getDatabase();
  
  // Users table
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT,
      role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      lastLogin DATETIME,
      isActive BOOLEAN DEFAULT 1
    )
  `);

  // Albums table
  database.exec(`
    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      clientId INTEGER NOT NULL,
      coverPhoto TEXT,
      isPublic BOOLEAN DEFAULT 0,
      allowDownloads BOOLEAN DEFAULT 1,
      expiresAt DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      shareToken TEXT UNIQUE,
      FOREIGN KEY (clientId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Photos table
  database.exec(`
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      albumId INTEGER NOT NULL,
      filename TEXT NOT NULL,
      originalName TEXT NOT NULL,
      title TEXT,
      description TEXT,
      filePath TEXT NOT NULL,
      thumbnailPath TEXT NOT NULL,
      fileSize INTEGER NOT NULL,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      mimeType TEXT NOT NULL,
      uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      isFavorited BOOLEAN DEFAULT 0,
      orderIndex INTEGER DEFAULT 0,
      metadata TEXT,
      FOREIGN KEY (albumId) REFERENCES albums (id) ON DELETE CASCADE
    )
  `);

  // Sessions table
  database.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      userId INTEGER NOT NULL,
      expiresAt DATETIME NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      lastAccessed DATETIME DEFAULT CURRENT_TIMESTAMP,
      ipAddress TEXT,
      userAgent TEXT,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Site settings table
  database.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes for performance
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
    CREATE INDEX IF NOT EXISTS idx_albums_client ON albums (clientId);
    CREATE INDEX IF NOT EXISTS idx_photos_album ON photos (albumId);
    CREATE INDEX IF NOT EXISTS idx_photos_order ON photos (albumId, orderIndex);
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions (userId);
    CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions (expiresAt);
  `);

  // Insert default admin user if not exists
  const adminExists = database.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('admin') as { count: number };
  
  if (adminExists.count === 0) {
    const adminPassword = hash('admin123', 12);
    database.prepare(`
      INSERT INTO users (email, password, firstName, lastName, role)
      VALUES (?, ?, ?, ?, ?)
    `).run('admin@photography.com', adminPassword, 'Admin', 'User', 'admin');
  }

  // Insert default site settings
  const defaultSettings = [
    { key: 'site_title', value: 'Professional Photography Studio' },
    { key: 'site_description', value: 'Capturing life\'s beautiful moments with artistic excellence' },
    { key: 'photographer_name', value: 'Your Photography Business' },
    { key: 'contact_email', value: 'hello@yourphotography.com' },
    { key: 'contact_phone', value: '+1 (555) 123-4567' },
    { key: 'business_address', value: 'Your Studio Address' },
    { key: 'social_instagram', value: '' },
    { key: 'social_facebook', value: '' },
    { key: 'allow_registration', value: 'false' },
    { key: 'max_album_size_mb', value: '500' },
    { key: 'watermark_enabled', value: 'true' }
  ];

  const settingsStmt = database.prepare(`
    INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)
  `);

  defaultSettings.forEach(setting => {
    settingsStmt.run(setting.key, setting.value);
  });

  console.log('Database initialized successfully');
}

// User operations
export const userOperations = {
  create: (user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO users (email, password, firstName, lastName, phone, role, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(user.email, user.password, user.firstName, user.lastName, user.phone, user.role, user.isActive);
  },

  findByEmail: (email: string): User | undefined => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  },

  findById: (id: number): User | undefined => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  },

  updateLastLogin: (id: number) => {
    const db = getDatabase();
    const stmt = db.prepare('UPDATE users SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?');
    return stmt.run(id);
  },

  getAllClients: (): User[] => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM users WHERE role = ? ORDER BY createdAt DESC');
    return stmt.all('client') as User[];
  }
};

// Album operations
export const albumOperations = {
  create: (album: Omit<Album, 'id' | 'createdAt' | 'updatedAt'>) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO albums (title, description, clientId, coverPhoto, isPublic, allowDownloads, expiresAt, shareToken)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      album.title,
      album.description,
      album.clientId,
      album.coverPhoto,
      album.isPublic,
      album.allowDownloads,
      album.expiresAt,
      album.shareToken
    );
  },

  findByClientId: (clientId: number): Album[] => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM albums WHERE clientId = ? ORDER BY createdAt DESC');
    return stmt.all(clientId) as Album[];
  },

  findById: (id: number): Album | undefined => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM albums WHERE id = ?');
    return stmt.get(id) as Album | undefined;
  },

  findByShareToken: (shareToken: string): Album | undefined => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM albums WHERE shareToken = ?');
    return stmt.get(shareToken) as Album | undefined;
  },

  getAll: (): Album[] => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM albums ORDER BY createdAt DESC');
    return stmt.all() as Album[];
  }
};

// Photo operations
export const photoOperations = {
  create: (photo: Omit<Photo, 'id' | 'uploadedAt'>) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO photos (albumId, filename, originalName, title, description, filePath, thumbnailPath, 
                         fileSize, width, height, mimeType, isFavorited, orderIndex, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      photo.albumId,
      photo.filename,
      photo.originalName,
      photo.title,
      photo.description,
      photo.filePath,
      photo.thumbnailPath,
      photo.fileSize,
      photo.width,
      photo.height,
      photo.mimeType,
      photo.isFavorited,
      photo.orderIndex,
      photo.metadata
    );
  },

  findByAlbumId: (albumId: number): Photo[] => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM photos WHERE albumId = ? ORDER BY orderIndex ASC, uploadedAt ASC');
    return stmt.all(albumId) as Photo[];
  },

  updateFavorite: (id: number, isFavorited: boolean) => {
    const db = getDatabase();
    const stmt = db.prepare('UPDATE photos SET isFavorited = ? WHERE id = ?');
    return stmt.run(isFavorited, id);
  },

  delete: (id: number) => {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM photos WHERE id = ?');
    return stmt.run(id);
  }
};

// Session operations
export const sessionOperations = {
  create: (session: Omit<Session, 'createdAt' | 'lastAccessed'>) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO sessions (id, userId, expiresAt, ipAddress, userAgent)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(session.id, session.userId, session.expiresAt, session.ipAddress, session.userAgent);
  },

  findById: (id: string): Session | undefined => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM sessions WHERE id = ? AND expiresAt > CURRENT_TIMESTAMP');
    return stmt.get(id) as Session | undefined;
  },

  updateLastAccessed: (id: string) => {
    const db = getDatabase();
    const stmt = db.prepare('UPDATE sessions SET lastAccessed = CURRENT_TIMESTAMP WHERE id = ?');
    return stmt.run(id);
  },

  delete: (id: string) => {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM sessions WHERE id = ?');
    return stmt.run(id);
  },

  cleanup: () => {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM sessions WHERE expiresAt < CURRENT_TIMESTAMP');
    return stmt.run();
  }
};

// Settings operations
export const settingsOperations = {
  get: (key: string): string | undefined => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT value FROM site_settings WHERE key = ?');
    const result = stmt.get(key) as { value: string } | undefined;
    return result?.value;
  },

  set: (key: string, value: string) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO site_settings (key, value, updatedAt)
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `);
    return stmt.run(key, value);
  },

  getAll: (): Record<string, string> => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT key, value FROM site_settings');
    const rows = stmt.all() as { key: string; value: string }[];
    const result: Record<string, string> = {};
    rows.forEach(row => {
      result[row.key] = row.value;
    });
    return result;
  }
=======
};