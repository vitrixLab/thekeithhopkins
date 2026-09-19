import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Briefcase,
  Users,
  Tv,
  Paintbrush,
  Rocket,
  ArrowRight,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import type { Service } from '@/lib/types';
import servicesRaw from '@/lib/data/services.json';
import { resolveImagePath } from '@/lib/utils';

const services = servicesRaw as Service[];

const ICONS = {
  'artist-management': Paintbrush,
  talent: Users,
  entertainment: Tv,
  'creative-digital-media-services': Rocket,
  'specialized-ventures-business-innovations': Briefcase,
};

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.title,
    description: service.overview.slice(0, 160),
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = ICONS[service.slug as keyof typeof ICONS] ?? Briefcase;
  const resolvedImages = (service.images || [])
    .map(resolveImagePath)
    .filter((src) => src && !src.includes('undefined'));

  return (
    <div className="min-h-screen bg-surface-base">
      {/* ─── Breadcrumb & Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-surface-1 py-16 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #e7bd44, transparent 70%)' }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-600" />
            <Link href="/service" className="transition-colors hover:text-white">
              Services
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-600" />
            <span className="text-brand-400">{service.title}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="badge">Practice Area</span>
              </div>
              <h1 className="text-display-lg mt-4 text-white">
                {service.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-300">
                {service.overview}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={`/#contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
                className="btn-primary text-center"
              >
                Inquire About Service
              </Link>
              <Link
                href="/pricing"
                className="btn-ghost text-center"
              >
                View Pricing Tiers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Details & Deliverables ──────────────────────────────── */}
      <section className="section-padding bg-mesh relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-8">
              {service.details && service.details.length > 0 && (
                <div className="glass-card p-8 sm:p-10">
                  <h2 className="text-display-md mb-6 text-white">
                    Deliverables &amp; Strategic Scope
                  </h2>
                  <div className="space-y-4">
                    {service.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 rounded-lg border border-gray-800/80 bg-surface-2/40 p-4 transition-colors hover:border-brand-500/30"
                      >
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                        <p className="text-sm leading-relaxed text-gray-300">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Headings / Themes */}
              {service.headings && service.headings.length > 0 && (
                <div className="glass-card p-8">
                  <h3 className="text-label-sm mb-4 text-gray-400">
                    Core Competencies &amp; Pillars
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {service.headings.map((heading, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-amber-500/20 bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold text-brand-300"
                      >
                        {heading}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA & Other Services */}
            <div className="space-y-8 lg:col-span-4">
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white">
                  Schedule Discovery Call
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Connect directly with Keith to discuss how {service.title} can accelerate your business objectives.
                </p>
                <div className="mt-5">
                  <Link
                    href={`/#contact?subject=${encodeURIComponent(`Consultation: ${service.title}`)}`}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Get in Touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Other Services */}
              <div className="glass-card p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Explore Other Services
                </h3>
                <ul className="mt-4 space-y-2">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.id}>
                        <Link
                          href={s.nextjs_route}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-brand-400"
                        >
                          <span>{s.title}</span>
                          <ChevronRight className="h-4 w-4 text-gray-600" />
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Service Gallery Images if available */}
          {resolvedImages.length > 0 && (
            <div className="mt-16 border-t border-gray-800 pt-12">
              <h3 className="text-display-md mb-8 text-white">
                Visual Showcase
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {resolvedImages.slice(0, 4).map((imgSrc, i) => (
                  <div
                    key={i}
                    className="glass-card group relative aspect-video overflow-hidden rounded-xl"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${service.title} showcase ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
