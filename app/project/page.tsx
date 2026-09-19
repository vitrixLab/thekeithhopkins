import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers } from 'lucide-react';
import type { Project } from '@/lib/types';
import projectsRaw from '@/lib/data/projects.json';
import { resolveImagePath } from '@/lib/utils';

const projects = projectsRaw as Project[];

export const metadata: Metadata = {
  title: 'Portfolio & Ventures Case Studies',
  description:
    'Explore selected case studies and venture scaling projects managed and advised by Keith Hopkins.',
};

export default function ProjectsIndexPage() {
  return (
    <div className="min-h-screen bg-surface-base">
      {/* ─── Hero Header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-surface-1 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/3 h-96 w-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #e7bd44, transparent 70%)' }}
        />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="badge">Track Record</span>
          <h1 className="text-display-lg mt-4 text-white">
            Premium{' '}
            <span className="text-gradient-gold">Products</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            High-quality products designed to enhance wellness, beauty, and
            lifestyle for a healthier, happier life.
          </p>
        </div>
      </section>

      {/* ─── Projects Grid ───────────────────────────────────────── */}
      <section className="section-padding bg-mesh relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const coverImage = resolveImagePath(project.images[0]) || '/images/06/Business.png';

              return (
                <div
                  key={project.id}
                  className="glass-card group flex flex-col overflow-hidden transition-all hover:border-brand-500/40"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
                    <Image
                      src={coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-base/80 via-transparent to-transparent" />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
                        <Layers className="h-3.5 w-3.5" /> Premium Product
                      </div>
                      <h2 className="mt-2 text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
                        {project.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-400">
                        {project.description}
                      </p>

                      {/* Strategy tags */}
                      {project.strategies && project.strategies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.strategies.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="rounded bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <Link
                        href={project.nextjs_route}
                        className="flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-gap group-hover:gap-2.5"
                      >
                        View Product <ArrowRight className="h-4 w-4" />
                      </Link>
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
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-display-md text-white">
            Have a project in mind? Let&apos;s discuss.
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Reach out about products, services, or partnerships.
          </p>
          <div className="mt-6">
            <Link href="/#contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
