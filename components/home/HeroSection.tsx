'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { SiteConfig } from '@/lib/types';

// Dynamically import the WebGL canvas — never SSR it
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

interface HeroSectionProps {
  config: SiteConfig;
}

export default function HeroSection({ config }: HeroSectionProps) {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-surface-base px-4 text-center"
    >
      {/* Three.js WebGL background — absolutely positioned, pointer-events:none */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <HeroCanvas />
      </div>

      {/* Radial vignette overlay so text stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(25,10,12,0.55) 60%, rgba(25,10,12,0.92) 100%)',
        }}
      />

      {/* Hero content — above canvas + vignette */}
      <div className="relative z-20 flex flex-col items-center gap-10">
        {/* Eye-brow label */}
        <span className="badge animate-fade-up">
          Artist Management · Marketing · Consulting
        </span>

        {/* Main headline — quoted from thekeithhopkins.com */}
        <h1 className="text-display-xl animate-fade-up animation-delay-1 text-gradient-amber max-w-4xl">
          {config.hero_title}
        </h1>

        {/* Subtitle — quoted bio from the live site */}
        <p className="animate-fade-up animation-delay-2 max-w-xl text-lg leading-relaxed text-gray-400">
          {config.hero_subtitle}
        </p>

        {/* Metrics row */}
        <div className="animate-fade-up animation-delay-3 mt-6 flex flex-wrap justify-center gap-14">
          {config.metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center">
              <span className="text-metric text-glow-gold font-bold text-brand-400">
                {m.value}
              </span>
              <span className="text-label-sm mt-2 text-gray-500">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="animate-fade-up animation-delay-4 mt-6 flex flex-wrap justify-center gap-5">
          <Link href="/service" className="btn-primary">
            View Services
          </Link>
          <Link href="/fillmypipeline" className="btn-ghost">
            Free AI Audit
          </Link>
        </div>
      </div>

      {/* Scanline bottom divider */}
      <div className="scanline-divider absolute bottom-0 left-0 right-0 z-20" />
    </section>
  );
}
