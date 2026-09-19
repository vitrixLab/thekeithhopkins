import Link from 'next/link';
import {
  LucideIcon,
  Briefcase,
  Users,
  Tv,
  Paintbrush,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import type { Service } from '@/lib/types';

const ICONS: Record<string, LucideIcon> = {
  'artist-management': Paintbrush,
  talent: Users,
  entertainment: Tv,
  'creative-digital-media-services': Rocket,
  'specialized-ventures-business-innovations': Briefcase,
};

/* ── Subheads quoted from thekeithhopkins.com (no invention) ────────────
   Talent:        "Discover, Develop, and Showcase Excellence"
   Entertainment: "Bringing Experiences to Life" (via Masters' Business Alliance)
   Creative:      "Create. Connect. Grow."
   Ventures:      "Turning Ideas Into Real Businesses"
   Artist Mgmt:   "Artist Management"
   Products teaser (live site "Premium Products"): "High-quality products
   designed to enhance wellness, beauty, and lifestyle for a healthier,
   happier life." — Body Butter Made With Love · Young Living Essential
   Oils · Alkaline Water Machines. */
const SUBHEADS: Record<string, string> = {
  'artist-management': 'Artist Management',
  talent: 'Discover, Develop, and Showcase Excellence',
  entertainment: 'Bringing Experiences to Life',
  'creative-digital-media-services': 'Create. Connect. Grow.',
  'specialized-ventures-business-innovations': 'Turning Ideas Into Real Businesses',
};

interface ServicesSectionProps {
  services: Service[];
}

/* ── Fibonacci service layout ───────────────────────────────────────────
   Row 1: 2 feature cards (61.8% + 38.2% — golden split)
   Row 2: 3 supporting cards (Fibonacci count 2-3-5 rhythm)
   Row 3: full-width Premium Products strip (real live-site section)    */
export default function ServicesSection({ services }: ServicesSectionProps) {
  const [first, second, ...rest] = services;

  const renderCard = (service: Service, large = false) => {
    const Icon = ICONS[service.slug] ?? Briefcase;
    return (
      <Link
        key={service.id}
        href={service.nextjs_route}
        className="glass-card group flex flex-col gap-4 p-6 transition-all sm:p-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20 transition-colors group-hover:bg-brand-500/20">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-label-sm text-brand-500">
            {SUBHEADS[service.slug] ?? service.title}
          </p>
          <h3 className={large ? 'text-display-md mt-2 text-white' : 'text-label-lg mt-2 text-white'}>
            {service.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-400">
            {service.overview}
          </p>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-brand-400 transition-gap group-hover:gap-2">
          Learn more <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    );
  };

  return (
    <section
      id="services"
      aria-label="Services"
      className="bg-mesh section-padding relative bg-surface-base"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — φ-spaced: eyebrow : title : lede ≈ 1 : 1.618 : 1 */}
        <div className="mb-phi-6 text-center">
          <span className="badge">Our Services</span>
          <h2 className="text-display-lg mt-phi-4 text-white">
            Expert Services,{' '}
            <span className="text-gradient-gold">Exceptional Results</span>
          </h2>
          <p className="mx-auto mt-phi-4 max-w-2xl text-gray-400">
            From artist management and talent development to digital media and
            specialized business ventures — every engagement is built around
            your goals.
          </p>
        </div>

        {/* Row 1 — golden split: first service 61.8%, second 38.2% */}
        <div className="fib-split">
          {first && renderCard(first, true)}
          {second && renderCard(second)}
        </div>

        {/* Row 2 — remaining three services */}
        <div className="mt-phi-5 grid gap-6 md:grid-cols-3">
          {rest.slice(0, 3).map((service) => renderCard(service))}
        </div>

        {/* Row 3 — Premium Products strip (real live-site content) */}
        <Link
          href="/project"
          className="glass-card group mt-phi-5 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="max-w-2xl">
            <p className="text-label-sm text-brand-500">Premium Products</p>
            <h3 className="text-display-md mt-2 text-white">
              Wellness, Beauty &amp; Lifestyle
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              High-quality products designed to enhance wellness, beauty, and
              lifestyle for a healthier, happier life — Body Butter Made With
              Love · Young Living Essential Oils · Alkaline Water Machines.
            </p>
          </div>
          <span className="btn-ghost shrink-0">
            View Products <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

        {/* View all CTA */}
        <div className="mt-phi-6 text-center">
          <Link href="/service" className="btn-ghost inline-flex">
            View All Services <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
