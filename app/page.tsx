import type { Metadata } from 'next';
import type { SiteConfig, Service } from '@/lib/types';
import siteConfigRaw from '@/lib/data/site-config.json';
import servicesRaw from '@/lib/data/services.json';

import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import ArtistSection from '@/components/home/ArtistSection';
import ContactSection from '@/components/home/ContactSection';

const siteConfig = siteConfigRaw as SiteConfig;
const services = servicesRaw as Service[];

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.tagline,
};

export default function HomePage() {
  return (
    <>
      {/* ① Hero — Three.js animated canvas */}
      <HeroSection config={siteConfig} />

      {/* ② About Keith — bio + expertise pillars */}
      <AboutSection />

      {/* ③ Services — glass-card grid from data */}
      <ServicesSection services={services} />

      {/* ④ Artist Roster — managed talent showcase */}
      <ArtistSection />

      {/* ⑤ Partners bar + Contact form */}
      <ContactSection />
    </>
  );
}
