import Link from 'next/link';
import { Music, Radio, Star } from 'lucide-react';

/* ── Roster quoted from the live site (thekeithhopkins.com/artist) ──────
   1. NOAH HUNTON — "Home is where you kick your boots off, and for Noah
      Hunton that home is in Ocala, FL … destined for [country]. Noah has
      been playing solo acoustic concerts and full band shows at local
      venues on the weekends all over the east coast, opening for known
      musicians, and performing at festivals, weddings, and private events."
   2. PATRICK GIBSON — "Patrick Gibson: The Artist Whose Music Inspires …
      public appearances on major TV networks like NEWSMAX, FOX 5 Las
      Vegas, FOX 35 Orlando, and KUSI San Diego."
   3. MICHAEL CARUBELLI — "Michael is a Texas-born singer-songwriter whose
      sound blends modern country energy with true storytelling. Having
      shared the stage with legends like Clay Walker, Shenandoah, and Wade
      Bowen … newest single, My Dad Builds Homes … fan favorites like
      'Tell Me' & 'Drunken Princess'."
   4. CARMAN COLLINS — "Carman Collins: The Artist Whose Music Inspires …
      a rising country music artist … Born and raised in Indiana, Carman
      began singing at just five years old."
   Live-site media appearances: NEWSMAX · FOX 5 Las Vegas ·
   FOX 35 Orlando · KUSI San Diego. */
const ARTISTS = [
  {
    name: 'Noah Hunton',
    genre: 'Country / Acoustic · Ocala, FL',
    description:
      'Solo acoustic concerts and full band shows at local venues all over the east coast — opening for known musicians, and performing at festivals, weddings, and private events.',
    icon: Music,
    accent: 'from-brand-400 to-brand-600',
  },
  {
    name: 'Patrick Gibson',
    genre: 'Inspirational · TV & Media',
    description:
      'The Artist Whose Music Inspires — public appearances on NEWSMAX, FOX 5 Las Vegas, FOX 35 Orlando, and KUSI San Diego, sharing a vision of encouragement and unity.',
    icon: Radio,
    accent: 'from-brand-300 to-brand-500',
  },
  {
    name: 'Michael Carubelli',
    genre: 'Modern Country · Texas',
    description:
      'Texas-born singer-songwriter blending modern country energy with true storytelling. Shared the stage with Clay Walker, Shenandoah, and Wade Bowen. Newest single: “My Dad Builds Homes”.',
    icon: Star,
    accent: 'from-brand-500 to-brand-700',
  },
  {
    name: 'Carman Collins',
    genre: 'Country · Indiana',
    description:
      'The Artist Whose Music Inspires — a rising country music artist whose voice and storytelling capture small-town roots, heartbreak, and resilience. Singing since age five.',
    icon: Music,
    accent: 'from-brand-300 to-brand-500',
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

        {/* Artist cards — 2×2 Fibonacci grid (φ rhythm in card gaps) */}
        <div className="grid gap-8 sm:grid-cols-2">
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
                  <Icon className="h-7 w-7 text-brand-400" />
                </div>
              </div>

              <span className="text-label-sm text-brand-500">{genre}</span>
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
