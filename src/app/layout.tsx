
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
  title: 'Nexus Gaming Hub | Ultimate Gaming News & Reviews',
  description: 'Discover the latest gaming news, reviews, and exclusive content. Immerse yourself in the future of gaming with cutting-edge design and interactive experiences.',
  keywords: 'gaming news, game reviews, esports, gaming technology, gaming community',
  authors: [{ name: 'Nexus Gaming Hub' }],
  openGraph: {
    title: 'Nexus Gaming Hub | Ultimate Gaming News & Reviews',
    description: 'Discover the latest gaming news, reviews, and exclusive content.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus Gaming Hub | Ultimate Gaming News & Reviews',
    description: 'Discover the latest gaming news, reviews, and exclusive content.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
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