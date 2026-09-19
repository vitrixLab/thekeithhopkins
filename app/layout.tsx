import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3, Space_Mono } from 'next/font/google';
import './globals.css';

import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { SiteConfig } from '@/lib/types';

import siteConfigRaw from '@/lib/data/site-config.json';

const siteConfig = siteConfigRaw as SiteConfig;

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brand_name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.brand_name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    type: 'website',
    siteName: siteConfig.brand_name,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen bg-gray-950 font-sans text-gray-100 antialiased">
        <Header nav={siteConfig.navigation} brandName={siteConfig.brand_name} />
        <main>{children}</main>
        <Footer
          nav={siteConfig.navigation}
          brandName={siteConfig.brand_name}
          tagline={siteConfig.tagline}
          copyright={siteConfig.copyright}
        />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6aa386ac4d7ca2bf0f542535"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
