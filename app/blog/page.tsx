import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import type { Post } from '@/lib/types';
import postsRaw from '@/lib/data/posts.json';
import { formatDate } from '@/lib/utils';

const posts = postsRaw as Post[];

export const metadata: Metadata = {
  title: 'Insights & Articles',
  description:
    'Thought leadership, strategic insights, and practical frameworks on commercial operations, risk mitigation, and creative venture growth.',
};

export default function BlogIndexPage() {
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
          <span className="badge">Insights &amp; Analysis</span>
          <h1 className="text-display-lg mt-4 text-white">
            Perspectives on{' '}
            <span className="text-gradient-gold">Strategy &amp; Growth</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Field notes, operational frameworks, and industry commentary from 15+ years across artist management and commercial enterprises.
          </p>
        </div>
      </section>

      {/* ─── Blog Posts Grid ─────────────────────────────────────── */}
      <section className="section-padding bg-mesh relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="glass-card group flex flex-col justify-between p-8 transition-all hover:border-brand-500/40"
              >
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5 text-brand-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      3 min read
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-white transition-colors group-hover:text-brand-300">
                    <Link href={post.nextjs_route}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-400">
                    {post.excerpt_html.replace(/<[^>]*>?/gm, '')}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> Article
                  </span>
                  <Link
                    href={post.nextjs_route}
                    className="flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-gap group-hover:gap-2.5"
                  >
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
