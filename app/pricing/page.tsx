import type { Metadata } from 'next';
import Link from 'next/link';
import type { PricingTier } from '@/lib/types';
import pricingRaw from '@/lib/data/pricing.json';
import PricingTable from '@/components/ui/PricingTable';
import { HelpCircle, ArrowRight } from 'lucide-react';

const pricingTiers = pricingRaw as PricingTier[];

export const metadata: Metadata = {
  title: 'Pricing & Engagement Tiers',
  description:
    'Transparent advisory and commercial consulting packages tailored for emerging talent, scaling brands, and corporate enterprises.',
};

const FAQS = [
  {
    q: 'What is included in the monthly strategy sessions?',
    a: 'Each strategy session is a focused 1-on-1 executive consultation covering your operational priorities, contract structures, commercial growth channels, or risk mitigation plans. You receive an actionable brief following each session.',
  },
  {
    q: 'Can we customize an engagement package?',
    a: 'Yes. While our standard tiers cover most client needs, our Corporate / Enterprise tier is tailored specifically to the scope, speed, and regulatory environment of your organization.',
  },
  {
    q: 'What is the commitment term for monthly retainers?',
    a: 'Our advisory packages are typically structured on a 3-month or 6-month initial engagement to ensure measurable commercial results, transitioning to month-to-month thereafter with 30 days notice.',
  },
  {
    q: 'How does Keith Hopkins assist with venture scaling?',
    a: 'Keith brings direct operating experience across talent management, commercial operations, and strategic partnerships. We connect founders and executives directly with qualified venture partners and media channels.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-surface-base">
      {/* ─── Hero Header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-surface-1 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent 70%)' }}
        />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="badge">Transparent Investment</span>
          <h1 className="text-display-lg mt-4 text-white">
            Strategic Advisory{' '}
            <span className="text-gradient-gold">Built For Growth</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Select an advisory tier aligned with your venture&apos;s current trajectory.
            From initial strategy roadmaps to enterprise-grade commercial operations.
          </p>
        </div>
      </section>

      {/* ─── Pricing Grid ────────────────────────────────────────── */}
      <section className="section-padding bg-mesh relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PricingTable tiers={pricingTiers} />
        </div>
      </section>

      {/* ─── FAQ Section ─────────────────────────────────────────── */}
      <section className="border-t border-gray-800 bg-surface-1 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="badge">Frequently Asked Questions</span>
            <h2 className="text-display-md mt-4 text-white">
              Questions About{' '}
              <span className="text-gradient-amber">Engagements</span>
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Everything you need to know about working with Keith Hopkins.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="glass-card group rounded-xl p-6 transition-all"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-white transition-colors group-hover:text-amber-400">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-amber-400/80" />
                    {faq.q}
                  </span>
                  <span className="text-amber-400 transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 border-t border-gray-800/80 pt-4 text-sm leading-relaxed text-gray-400">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="glass-card mt-16 p-8 text-center sm:p-10">
            <h3 className="text-xl font-bold text-white">
              Need a bespoke partnership or custom scope?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-400">
              Schedule a 30-minute discovery consultation to discuss specific project deliverables, timelines, and commercial objectives.
            </p>
            <div className="mt-6">
              <Link href="/#contact" className="btn-primary inline-flex">
                Schedule Discovery Call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
