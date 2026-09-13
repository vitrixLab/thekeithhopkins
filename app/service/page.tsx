import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Users,
  Tv,
  Paintbrush,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import type { Service } from '@/lib/types';
import servicesRaw from '@/lib/data/services.json';

const services = servicesRaw as Service[];

export const metadata: Metadata = {
  title: 'Services & Advisory Practices',
  description:
    'Comprehensive services across Artist Management, Talent Development, Live Entertainment, Creative Media, and Specialized Commercial Ventures.',
};

const ICONS = {
  'artist-management': Paintbrush,
  talent: Users,
  entertainment: Tv,
  'creative-digital-media-services': Rocket,
  'specialized-ventures-business-innovations': Briefcase,
};

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen bg-surface-base">
      {/* ─── Hero Header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-surface-1 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent 70%)' }}
        />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="badge">Practice Areas</span>
          <h1 className="text-display-lg mt-4 text-white">
            Specialized Services,{' '}
            <span className="text-gradient-gold">Proven Execution</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            From discovering and booking breakout talent to launching multi-million dollar business ventures — Keith Hopkins delivers end-to-end strategic advisory and hands-on commercial leadership.
          </p>
        </div>
      </section>

      {/* ─── Services Detailed Grid ──────────────────────────────── */}
      <section className="section-padding bg-mesh relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service) => {
              const Icon = ICONS[service.slug as keyof typeof ICONS] ?? Briefcase;

              return (
                <div
                  key={service.id}
                  className="glass-card group overflow-hidden p-8 transition-all hover:border-amber-500/40 lg:p-12"
                >
                  <div className="grid items-start gap-8 lg:grid-cols-12">
                    {/* Left Icon & Heading */}
                    <div className="lg:col-span-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20 transition-colors group-hover:bg-amber-500/20">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h2 className="text-display-md mt-6 text-white">
                        {service.title}
                      </h2>
                      <div className="mt-6">
                        <Link
                          href={service.nextjs_route}
                          className="btn-primary inline-flex text-sm"
                        >
                          Explore Service <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Overview & Highlights */}
                    <div className="space-y-6 lg:col-span-8 lg:border-l lg:border-gray-800/80 lg:pl-10">
                      <p className="text-base leading-relaxed text-gray-300">
                        {service.overview}
                      </p>

                      {service.details && service.details.length > 0 && (
                        <div className="border-t border-gray-800/60 pt-6">
                          <h3 className="text-label-sm mb-3 text-amber-400">
                            Key Focus &amp; Deliverables
                          </h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {service.details.slice(0, 4).map((detail, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2.5 text-sm text-gray-400"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                                <span className="line-clamp-2">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────────── */}
      <section className="border-t border-gray-800 bg-surface-1 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-display-md text-white">
            Have a project or venture in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Let&apos;s evaluate your requirements and structure a dedicated advisory program to achieve your milestones.
          </p>
          <div className="mt-8">
            <Link href="/#contact" className="btn-primary">
              Contact Keith Hopkins
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
