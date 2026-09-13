import Link from 'next/link';
import { Check, Zap } from 'lucide-react';
import type { PricingTier } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PricingTableProps {
  tiers: PricingTier[];
}

export default function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {tiers.map((tier) => {
        const isPopular = !!tier.popular;
        return (
          <div
            key={tier.name}
            className={cn(
              'glass-card relative flex flex-col justify-between p-8 transition-all',
              isPopular
                ? 'border-amber-500/60 shadow-[0_0_30px_rgba(251,191,36,0.15)] ring-1 ring-amber-500/40'
                : 'hover:border-amber-500/30',
            )}
          >
            {/* Top popular badge */}
            {isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-gray-950 shadow-md">
                  <Zap className="h-3 w-3 fill-current" /> Most Popular
                </span>
              </div>
            )}

            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              </div>
              <p className="mt-2 min-h-[40px] text-sm text-gray-400">
                {tier.description}
              </p>

              {/* Price display */}
              <div className="mt-6 flex items-baseline gap-1 border-b border-gray-800 pb-6">
                <span className="text-display-md text-glow-gold font-bold text-white">
                  {tier.price}
                </span>
                <span className="text-xs text-gray-400">/{tier.period}</span>
              </div>

              {/* Features list */}
              <div className="mt-6 space-y-3.5">
                <p className="text-label-sm text-gray-400">Included Features</p>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4">
              <Link
                href={`/#contact?subject=${encodeURIComponent(`Inquiry about ${tier.name} Plan`)}`}
                className={cn(
                  'block w-full py-3 text-center text-sm font-semibold transition-all',
                  isPopular
                    ? 'btn-primary'
                    : 'btn-ghost justify-center',
                )}
              >
                Choose {tier.name.split('/')[0].trim()}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
