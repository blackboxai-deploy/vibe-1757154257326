import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Toaster } from '@/components/ui/sonner';
import { config } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.site.name,
  description: config.site.description,
  keywords: ['photography', 'wedding photographer', 'portrait photographer', 'professional photography'],
  authors: [{ name: config.site.photographer.name }],
  creator: config.site.photographer.name,
  publisher: config.site.photographer.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: config.site.url,
    title: config.site.name,
    description: config.site.description,
    siteName: config.site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: config.site.name,
    description: config.site.description,
    creator: '@yourhandle', // Update with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-id', // Update with actual Google verification ID
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}