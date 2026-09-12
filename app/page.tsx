import type { Metadata } from 'next';
import type { SiteConfig } from '@/lib/types';
import siteConfigRaw from '@/lib/data/site-config.json';

const siteConfig = siteConfigRaw as SiteConfig;

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.tagline,
};

export default function HomePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {siteConfig.hero_title}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-gray-400">{siteConfig.tagline}</p>

      {/* Metrics */}
      <div className="mt-12 grid grid-cols-3 gap-8">
        {siteConfig.metrics.map((m) => (
          <div key={m.label} className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-amber-400">
              {m.value}
            </span>
            <span className="mt-1 text-sm text-gray-400">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <a
          href="/service"
          className="rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-gray-950 hover:bg-amber-400"
        >
          View Services
        </a>
        <a
          href="/fillmypipeline"
          className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Free AI Audit
        </a>
      </div>
    </div>
  );
}
