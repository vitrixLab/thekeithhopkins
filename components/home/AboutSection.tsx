import {
  Music2,
  Megaphone,
  ShieldCheck,
  Plane,
  Star,
} from 'lucide-react';
import type { SiteConfig } from '@/lib/types';

/* Capability pillars — labels + percents quoted from thekeithhopkins.com:
   "100% Commercial Operations · 99% Risk Assessment ·
    99% Strategic Consulting · 100% Licensed Aviator" */
const PILLAR_ICONS = [Music2, Megaphone, ShieldCheck, Plane];

/* ── Golden-ratio badge row: 3 badges at φ⁰ … ────────────────────────── */
const BADGES = [
  '15+ Yrs Experience',
  '5/5 Average Rating',
  '10+ Countries Visited',
  'Licensed Professional',
];

export default function AboutSection({ config }: { config: SiteConfig }) {
  return (
    <section
      id="about"
      aria-label="About Keith Hopkins"
      className="section-padding-compact relative overflow-hidden bg-surface-1"
    >
      {/* Ambient glow top-right — champagne gold on maroon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #e7bd44, transparent 70%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Fibonacci split: bio 61.8% · capabilities 38.2% */}
        <div className="fib-split items-center">
          {/* Left — bio (φ share) */}
          <div>
            <span className="badge">About Keith</span>
            <h2 className="text-display-lg mt-4 text-white">
              15+ Years of{' '}
              <span className="text-gradient-amber">Entrepreneurship</span>
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-gray-300">
              {config.about_bio}
            </p>

            {/* Credential badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {BADGES.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1.5 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400"
                >
                  <Star className="h-3 w-3" /> {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right — capability bars with real % from live site */}
          <div className="glass-card p-8">
            <h3 className="text-label-sm text-brand-400">Capabilities</h3>
            <ul className="mt-5 space-y-5">
              {config.capabilities.map(({ label, percent }, i) => {
                const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
                return (
                  <li key={label}>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Icon className="h-4 w-4 text-brand-400" aria-hidden="true" />
                        {label}
                      </span>
                      <span className="font-display text-lg font-bold text-brand-400">
                        {percent} %
                      </span>
                    </div>
                    <div
                      className="h-1.5 overflow-hidden rounded-full bg-surface-3"
                      role="progressbar"
                      aria-valuenow={percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={label}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-200 via-brand-400 to-brand-600"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
