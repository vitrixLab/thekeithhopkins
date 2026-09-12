import Link from 'next/link';
import { Music, Radio, Globe } from 'lucide-react';

const ARTISTS = [
  {
    name: 'Noah Hunton',
    genre: 'Country / Acoustic',
    description:
      'Based in Ocala, FL, Noah blends southern roots with acoustic storytelling — performing at venues, festivals, and private events across the east coast.',
    icon: Music,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Patrick Gibson',
    genre: 'Inspirational / Media',
    description:
      'A multi-platform artist with appearances on NEWSMAX, FOX 5 Las Vegas, FOX 35 Orlando, and KUSI San Diego — sharing music and encouragement at scale.',
    icon: Radio,
    accent: 'from-amber-400 to-yellow-500',
  },
  {
    name: 'Michael Carubelli',
    genre: 'Multi-genre',
    description:
      'An accomplished performer whose versatility spans genres and stages, backed by Keith Hopkins\' full artist management suite.',
    icon: Globe,
    accent: 'from-orange-500 to-amber-600',
  },
];

export default function ArtistSection() {
  return (
    <section
      id="artist"
      aria-label="Artist Management"
      className="bg-mesh section-padding bg-surface-base"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="badge">Artist Roster</span>
          <h2 className="text-display-lg mt-4 text-white">
            Talent We{' '}
            <span className="text-gradient-gold">Believe In</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Keith manages a curated roster of artists — matching raw talent with
            the right stages, partnerships, and long-term career strategy.
          </p>
        </div>

        {/* Artist cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {ARTISTS.map(({ name, genre, description, icon: Icon, accent }) => (
            <div
              key={name}
              className="glass-card group relative overflow-hidden p-8"
            >
              {/* Gradient top accent bar */}
              <div
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent} opacity-70 transition-opacity group-hover:opacity-100`}
              />

              {/* Icon */}
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${accent} p-0.5`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-surface-1">
                  <Icon className="h-7 w-7 text-amber-400" />
                </div>
              </div>

              <span className="text-label-sm text-amber-500">{genre}</span>
              <h3 className="mt-1 text-xl font-bold text-white">{name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/service/artist-management" className="btn-primary inline-flex">
            Explore Artist Management
          </Link>
        </div>
      </div>
    </section>
  );
}
