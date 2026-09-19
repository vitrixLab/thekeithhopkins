import Link from 'next/link';
import type { Metadata } from 'next';
import { BatteryCharging, Mail, MapPin, Phone } from 'lucide-react';
import siteConfig from '@/lib/data/site-config.json';

export const metadata: Metadata = {
  title: 'Bluetti Texas Power',
  description:
    'Bluetti Texas Power — a Keith Hopkins venture. Portable power stations and solar solutions for Texas.',
};

export default function BluettiPage() {
  return (
    <section className="bg-mesh section-padding bg-surface-base">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/30">
          <BatteryCharging className="h-8 w-8 text-brand-400" />
        </div>
        <span className="badge">A Keith Hopkins Venture</span>
        <h1 className="text-display-xl mt-4 text-gradient-amber">
          Bluetti Texas Power
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-300">
          Portable power stations and solar solutions serving Texas. For
          availability, pricing, and orders, reach out directly.
        </p>

        <div className="mt-8 flex flex-col items-center gap-2 text-sm text-gray-400">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-400" />
            {siteConfig.contact.address}
          </span>
          <a href={`tel:${siteConfig.contact.phone}`} className="link-hover inline-flex items-center gap-2">
            <Phone className="h-4 w-4 text-brand-400" />
            {siteConfig.contact.phone_display}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="link-hover inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-brand-400" />
            {siteConfig.contact.email}
          </a>
        </div>

        <Link href="/#contact" className="btn-primary mt-10 inline-flex">
          Contact Us
        </Link>
      </div>
    </section>
  );
}
