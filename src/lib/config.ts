// Application configuration
export const config = {
  // Site settings
  site: {
    name: 'Professional Photography Studio',
    description: 'Capturing life\'s beautiful moments with artistic excellence',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    photographer: {
      name: 'Your Photography Business',
      email: 'hello@yourphotography.com',
      phone: '+1 (555) 123-4567',
      address: 'Your Studio Address',
    },
  },

  // Database settings
  database: {
    path: process.env.DATABASE_PATH || 'photography.db',
  },

  // Authentication settings
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret-key-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    sessionExpiresHours: 24 * 7, // 7 days
    passwordResetExpiresHours: 1,
  },

  // File upload settings
  upload: {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
    thumbnailSize: { width: 400, height: 300 },
    previewSize: { width: 1200, height: 900 },
  },

  // Email settings (for contact forms and notifications)
  email: {
    from: process.env.EMAIL_FROM || 'noreply@yourphotography.com',
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
    },
  },

  // Social media links
  social: {
    instagram: process.env.SOCIAL_INSTAGRAM || '',
    facebook: process.env.SOCIAL_FACEBOOK || '',
    twitter: process.env.SOCIAL_TWITTER || '',
    linkedin: process.env.SOCIAL_LINKEDIN || '',
  },

  // Business settings
  business: {
    allowClientRegistration: process.env.ALLOW_CLIENT_REGISTRATION === 'true',
    maxAlbumSizeMB: parseInt(process.env.MAX_ALBUM_SIZE_MB || '500'),
    defaultAlbumExpireDays: parseInt(process.env.DEFAULT_ALBUM_EXPIRE_DAYS || '365'),
    watermarkEnabled: process.env.WATERMARK_ENABLED !== 'false',
  },

  // API settings
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100, // per window
    },
  },

  // Development settings
  dev: {
    enableDebugRoutes: process.env.NODE_ENV === 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
} as const;

export type Config = typeof config;

// Helper function to get environment-specific settings
export function getConfig(): Config {
  return config;
}

// Validate required environment variables
export function validateEnvConfig(): string[] {
  const errors: string[] = [];

  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-jwt-secret-key-change-in-production') {
      errors.push('JWT_SECRET must be set in production');
    }

    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      errors.push('NEXT_PUBLIC_SITE_URL must be set in production');
    }
  }

  return errors;
}

// Default portfolio categories
export const portfolioCategories = [
  { id: 'weddings', name: 'Weddings', slug: 'weddings' },
  { id: 'portraits', name: 'Portraits', slug: 'portraits' },
  { id: 'events', name: 'Events', slug: 'events' },
  { id: 'family', name: 'Family', slug: 'family' },
  { id: 'corporate', name: 'Corporate', slug: 'corporate' },
  { id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle' },
] as const;

export type PortfolioCategory = typeof portfolioCategories[number];

// Photography packages/services
export const photographyServices = [
  {
    id: 'wedding-complete',
    name: 'Complete Wedding Package',
    description: 'Full day wedding coverage with engagement session',
    features: [
      '8-10 hours of coverage',
      'Engagement session included',
      'Online gallery with 500+ photos',
      'Print release for personal use',
      'USB drive with high-resolution images',
    ],
    price: 'Starting at $2,500',
    category: 'weddings',
  },
  {
    id: 'portrait-session',
    name: 'Portrait Session',
    description: 'Professional headshots and portraits',
    features: [
      '1-2 hours studio or location',
      'Multiple outfit changes',
      'Online gallery with 30+ edited photos',
      'Print release included',
      '5 high-resolution downloads',
    ],
    price: 'Starting at $350',
    category: 'portraits',
  },
  {
    id: 'family-session',
    name: 'Family Photography',
    description: 'Beautiful family memories captured',
    features: [
      '1 hour session',
      'Indoor/outdoor location',
      'Online gallery with 25+ photos',
      'Print release for family use',
      'Holiday card design included',
    ],
    price: 'Starting at $400',
    category: 'family',
  },
  {
    id: 'event-coverage',
    name: 'Event Photography',
    description: 'Corporate and special events',
    features: [
      'Full event coverage',
      'Professional editing',
      'Online gallery for sharing',
      'Commercial usage rights',
      'Same-day preview available',
    ],
    price: 'Starting at $150/hour',
    category: 'events',
  },
] as const;

export type PhotographyService = typeof photographyServices[number];