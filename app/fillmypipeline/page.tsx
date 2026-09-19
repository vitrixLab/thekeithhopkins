import type { Metadata } from 'next';
import {
  Target,
  ShieldCheck,
  BarChart3,
  Cpu,
} from 'lucide-react';
import AuditLeadForm from '@/components/ui/AuditLeadForm';

export const metadata: Metadata = {
  title: 'Fill My Pipeline — AI-Driven Commercial Pipeline Growth',
  description:
    'Identify hidden revenue bottlenecks, optimize deal velocity, and scale qualified customer acquisition with our bespoke commercial operations audit.',
};

const STATS = [
  { value: '3.4x', label: 'Average Pipeline Velocity Increase' },
  { value: '42%', label: 'Reduction in Customer Acquisition Cost' },
  { value: '$12M+', label: 'Commercial Value Unlocked' },
  { value: '100%', label: 'Actionable Executive Brief' },
];

const AUDIT_STEPS = [
  {
    step: '01',
    icon: Target,
    title: 'Funnel Diagnostic',
    description:
      'We analyze your traffic sources, qualification criteria, and lead routing to pinpoint where high-intent prospects drop off.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI Automation & Operations Audit',
    description:
      'We audit CRM workflows, follow-up cadence, and outreach infrastructure to identify automated scaling levers.',
  },
  {
    step: '03',
    icon: BarChart3,
    title: 'Growth Roadmap Delivery',
    description:
      'You receive an executive diagnostic report detailing immediate high-impact fixes and a 90-day pipeline acceleration plan.',
  },
];

export default function FillMyPipelinePage() {
  return (
    <div className="min-h-screen bg-surface-base">
      {/* ─── Hero Header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-surface-1 py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #e7bd44, transparent 70%)' }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge">Commercial Acceleration</span>
            <h1 className="text-display-lg mt-4 text-white">
              Transform Your Sales Pipeline Into a{' '}
              <span className="text-gradient-gold">Predictable Revenue Engine</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Stop guessing why qualified leads stall. Keith Hopkins applies institutional-grade commercial operations and AI diagnostic workflows to fill your pipeline with high-value contracts.
            </p>
          </div>

          {/* Metrics strip */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-y border-gray-800 py-10 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-display-md text-glow-gold font-bold text-brand-400">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Methodology & Form Section ──────────────────────────── */}
      <section className="section-padding bg-mesh relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-12">
            {/* Left: Process explanation */}
            <div className="space-y-10 lg:col-span-6">
              <div>
                <span className="badge">Audit Methodology</span>
                <h2 className="text-display-md mt-4 text-white">
                  How We Unlock Hidden Revenue
                </h2>
                <p className="mt-3 text-sm text-gray-400">
                  A rigorous 3-pillar evaluation tailored for B2B ventures, talent enterprises, and high-growth services companies.
                </p>
              </div>

              <div className="space-y-6">
                {AUDIT_STEPS.map(({ step, icon: Icon, title, description }) => (
                  <div key={step} className="glass-card flex gap-5 p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-brand-400">
                        STEP {step}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-white">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6 border-brand-500/30">
                <div className="flex items-center gap-3 text-brand-400">
                  <ShieldCheck className="h-6 w-6" />
                  <h4 className="font-bold text-white">
                    Confidential &amp; Secure
                  </h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  All shared metrics and company data are strictly protected under mutual non-disclosure agreements and used exclusively for your audit diagnosis.
                </p>
              </div>
            </div>

            {/* Right: Lead Capture Form */}
            <div className="lg:col-span-6">
              <AuditLeadForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
