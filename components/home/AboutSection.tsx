import {
  Mic2,
  TrendingUp,
  ShieldCheck,
  Network,
  Star,
} from 'lucide-react';

const PILLARS = [
  {
    icon: Mic2,
    title: 'Artist & Talent',
    body: 'Guiding artists, performers, and creative professionals from discovery to headline acts — Noah Hunton, Patrick Gibson, Michael Carubelli and more.',
  },
  {
    icon: TrendingUp,
    title: 'Commercial Operations',
    body: 'Streamlining revenue channels, contract strategy, and market entry for growth-stage ventures and enterprise clients across multiple sectors.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Assessment',
    body: 'Identifying and neutralizing operational, financial, and reputational risk before it costs you — practical frameworks built for fast-moving organizations.',
  },
  {
    icon: Network,
    title: 'Strategic Consulting',
    body: 'Board-level advisory, partnership structuring, and long-range planning that aligns your vision with execution at every stage of the journey.',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Keith Hopkins"
      className="section-padding relative overflow-hidden bg-surface-1"
    >
      {/* Ambient glow top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #fbbf24, transparent 70%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — bio */}
          <div>
            <span className="badge">About Keith</span>
            <h2 className="text-display-lg mt-4 text-white">
              15+ Years Building{' '}
              <span className="text-gradient-amber">Ventures That Last</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              Keith Hopkins is a licensed professional with over 15 years of
              experience spanning artist management, commercial operations, risk
              assessment, and strategic consulting across multiple industries.
            </p>
            <p className="mt-4 leading-relaxed text-gray-500">
              From brokering talent deals on the east coast to scaling
              enterprise-grade business ventures, Keith brings a rare blend of
              creative intuition and rigorous commercial discipline to every
              engagement.
            </p>

            {/* Credential badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                '15+ Yrs Experience',
                '5/5 Client Satisfaction',
                '10+ Enterprise Ventures',
                'Licensed Professional',
              ].map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400"
                >
                  <Star className="h-3 w-3" /> {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right — pillars */}
          <div className="grid gap-5 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-label-sm text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
