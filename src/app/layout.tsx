 
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import GlobalStyles from '@/styles/GlobalStyles';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Siler Gaming Hub | Ultimate Gaming News & Reviews',
  description: 'Discover the latest gaming news, reviews, and exclusive content. Immerse yourself in the future of gaming with cutting-edge design and interactive experiences.',
  keywords: 'gaming news, game reviews, esports, gaming technology, gaming community',
  authors: [{ name: 'Siler Gaming Hub' }],
  openGraph: {
    title: 'Siler Gaming Hub | Ultimate Gaming News & Reviews',
    description: 'Discover the latest gaming news, reviews, and exclusive content.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siler Gaming Hub | Ultimate Gaming News & Reviews',
    description: 'Discover the latest gaming news, reviews, and exclusive content.',
  },
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-icon-36x36.png', sizes: '36x36', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 