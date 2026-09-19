import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react';
import type { Post } from '@/lib/types';
import postsRaw from '@/lib/data/posts.json';
import { formatDate } from '@/lib/utils';

const posts = postsRaw as Post[];

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt_html.replace(/<[^>]*>?/gm, '').slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];

  if (!post) {
    notFound();
  }

  // Rewrite legacy Hostinger and WordPress upload URLs to sanitized local images
  const sanitizedHtml = post.content_html
    .replaceAll('https://orange-bat-843251.hostingersite.com/wp-content/uploads/', '/images/')
    .replaceAll('https://thekeithhopkins.com/wp-content/uploads/', '/images/');

  const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-surface-base">
      {/* ─── Article Header ──────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-800 bg-surface-1 py-16 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #e7bd44, transparent 70%)' }}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400 hover:text-brand-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>

          <h1 className="text-display-lg text-white">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-gray-800/80 pt-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 text-gray-300">
              <User className="h-4 w-4 text-brand-400" /> Keith Hopkins
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand-400" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-400" /> 3 min read
            </span>
          </div>
        </div>
      </section>

      {/* ─── Article Content ─────────────────────────────────────── */}
      <section className="section-padding bg-mesh relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 sm:p-12">
            <div
              className="article-prose space-y-6 text-base leading-relaxed text-gray-300 [&_h3]:text-display-md [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-white [&_p]:text-gray-300 [&_p]:leading-relaxed [&_figure]:my-8 [&_figure]:overflow-hidden [&_figure]:rounded-xl [&_img]:mx-auto [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_figure.wp-block-gallery]:grid [&_figure.wp-block-gallery]:grid-cols-1 [&_figure.wp-block-gallery]:gap-4 [&_figure.wp-block-gallery]:sm:grid-cols-2"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-gray-800 pt-12">
              <h3 className="text-display-md mb-8 text-white">
                Related Perspectives
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {relatedPosts.map((r) => (
                  <Link
                    key={r.id}
                    href={r.nextjs_route}
                    className="glass-card group p-6 transition-all hover:border-brand-500/40"
                  >
                    <span className="text-xs text-brand-400">
                      {formatDate(r.date)}
                    </span>
                    <h4 className="mt-2 text-lg font-bold text-white transition-colors group-hover:text-brand-300">
                      {r.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-xs text-gray-400">
                      {r.excerpt_html.replace(/<[^>]*>?/gm, '')}
                    </p>
                    <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-400 transition-gap group-hover:gap-2">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
