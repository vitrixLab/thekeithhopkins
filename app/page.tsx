import type { Metadata } from 'next';
import type { SiteConfig } from '@/lib/types';
import siteConfigRaw from '@/lib/data/site-config.json';
import HeroSection from '@/components/home/HeroSection';

const siteConfig = siteConfigRaw as SiteConfig;

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.tagline,
};

export default function HomePage() {
  return (
    <>
      <HeroSection config={siteConfig} />
    </>
  );
}
