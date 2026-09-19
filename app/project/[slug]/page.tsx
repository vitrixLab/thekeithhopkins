import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ArrowRight,
  Layers,
  Target,
  CheckCircle2,
} from 'lucide-react';
import type { Project } from '@/lib/types';
import projectsRaw from '@/lib/data/projects.json';
import ImageGallery from '@/components/ui/ImageGallery';

const projects = projectsRaw as Project[];

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-surface-base">
      {/* ─── Breadcrumb & Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-surface-1 py-16 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #e7bd44, transparent 70%)' }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-600" />
            <Link href="/project" className="transition-colors hover:text-white">
              Portfolio
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-600" />
            <span className="text-brand-400">{project.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400">
              <Layers className="h-4 w-4" /> Commercial Venture Case Study
            </div>
            <h1 className="text-display-lg mt-4 text-white">
              {project.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              {project.description}
            </p>

            {/* Strategy badges */}
            {project.strategies && project.strategies.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.strategies.map((strat, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-md border border-brand-500/25 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-300"
                  >
                    <Target className="h-3 w-3" /> {strat}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Case Study Narrative & Gallery ──────────────────────── */}
      <section className="section-padding bg-mesh relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Content Blocks */}
            <div className="space-y-8 lg:col-span-7">
              <div className="glass-card p-8 sm:p-10">
                <h2 className="text-display-md mb-6 text-white">
                  Strategy &amp; Execution Breakdown
                </h2>
                <div className="space-y-6 text-base leading-relaxed text-gray-300">
                  {project.content_blocks && project.content_blocks.length > 0 ? (
                    project.content_blocks.map((block, idx) => (
                      <p key={idx} className="border-l-2 border-brand-500/40 pl-4 text-gray-300">
                        {block}
                      </p>
                    ))
                  ) : (
                    <p>{project.description}</p>
                  )}
                </div>
              </div>

              {/* Highlights Card */}
              <div className="glass-card p-8">
                <h3 className="text-label-sm mb-4 text-brand-400">
                  Key Strategic Outcomes
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    'Commercial Operations Streamlining',
                    'Go-To-Market Alignment & Strategy',
                    'Brand Identity & Media Positioning',
                    'Operational Risk Audit & Control',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Gallery & Meta */}
            <div className="space-y-8 lg:col-span-5">
              <div className="glass-card p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white">
                  Project Gallery
                </h3>
                <p className="mb-6 mt-1 text-xs text-gray-400">
                  Click any screenshot to view in full resolution.
                </p>
                <ImageGallery images={project.images} title={project.title} />
              </div>

              {/* Consultation Card */}
              <div className="glass-card p-6 sm:p-8 text-center">
                <h3 className="text-lg font-bold text-white">
                  Interested in similar results?
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Speak with Keith Hopkins about designing an operational roadmap for your brand or venture.
                </p>
                <div className="mt-5">
                  <Link
                    href={`/#contact?subject=${encodeURIComponent(`Case Study Inquiry: ${project.title}`)}`}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Start A Conversation
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Next Project Footer Bar */}
          <div className="mt-16 border-t border-gray-800 pt-8 flex items-center justify-between">
            <Link
              href="/project"
              className="text-sm text-gray-400 hover:text-white"
            >
              ← Back to Portfolio
            </Link>
            <Link
              href={nextProject.nextjs_route}
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300"
            >
              Next Project: {nextProject.title} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
