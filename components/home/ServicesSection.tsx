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

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="services"
      aria-label="Services"
      className="bg-mesh section-padding relative bg-surface-base"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="badge">What We Do</span>
          <h2 className="text-display-lg mt-4 text-white">
            Expert Services,{' '}
            <span className="text-gradient-gold">Exceptional Results</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            From artist management and talent development to digital media and
            specialized business ventures — every engagement is built around
            your goals.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.slug] ?? Briefcase;
            return (
              <Link
                key={service.id}
                href={service.nextjs_route}
                className="glass-card group flex flex-col gap-4 p-6 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20 transition-colors group-hover:bg-amber-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-label-lg text-white">{service.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-400">
                    {service.overview}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-amber-400 transition-gap group-hover:gap-2">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* View all CTA */}
        <div className="mt-12 text-center">
          <Link href="/service" className="btn-ghost inline-flex">
            View All Services <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
