import type { Metadata } from 'next';
import Link from 'next/link';
import type { PricingTier } from '@/lib/types';
import pricingRaw from '@/lib/data/pricing.json';
import PricingTable from '@/components/ui/PricingTable';
import { HelpCircle, ArrowRight } from 'lucide-react';

const pricingTiers = pricingRaw as PricingTier[];

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent, all-inclusive packages across web, design, e-commerce, SEO, social, and animation — built to fit your goals and budget.',
};

const FAQS = [
  {
    q: 'What do the Website Development packages include?',
    a: 'Six tiers from Basic $249 one-time (1 page, 3 stock images, contact form) up to Corporate $3,949 one-time (unlimited pages, custom interactive build, analytics). Every tier includes W3C certified HTML, complete deployment, and 100% ownership rights.',
  },
  {
    q: 'How do Logo Design packages work?',
    a: 'Five tiers from Startup $49 one-time (4 concepts, 2 revisions) to Premium $449 one-time (everything in Business plus custom illustration). All include 100% ownership and satisfaction guarantees on eligible packages.',
  },
  {
    q: 'What E-Commerce options are available?',
    a: 'Six tiers from Basic $649 one-time (5 products) to Corporate $7,949 one-time (500+ products, parallax, analytics). Higher tiers add CMS, custom forms, lead capturing, and dedicated industry teams.',
  },
  {
    q: 'Are prices monthly or one-time?',
    a: 'Website, logo, e-commerce, animation, and custom builds are one-time. SEO (from $4,499/mo), social media (from $350/mo), maintenance ($250/mo), and priority support ($180/mo) are monthly. All prices in USD; money-back guarantee applies to eligible packages.',
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
          style={{ background: 'radial-gradient(circle, #e7bd44, transparent 70%)' }}
        />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="badge">Transparent Packages</span>
          <h1 className="text-display-lg mt-4 text-white">
            Our{' '}
            <span className="text-gradient-gold">Pricing Plans</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Clear, all-inclusive packages across web, design, e-commerce, SEO,
            social media, and animation — built to fit your goals and budget.
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
              <span className="text-gradient-amber">Pricing</span>
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
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-white transition-colors group-hover:text-brand-400">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-brand-400/80" />
                    {faq.q}
                  </span>
                  <span className="text-brand-400 transition-transform duration-200 group-open:rotate-180">
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
              Need something custom? Let&apos;s talk.
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-400">
              All prices in USD. Money-back guarantee applies to eligible
              packages — reach out and we&apos;ll scope the right fit.
            </p>
            <div className="mt-6">
              <Link href="/#contact" className="btn-primary inline-flex">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
