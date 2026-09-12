import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fix legacy wp-content image paths coming from migration-data JSON.
 * Converts  "../../wp-content/uploads/..."  →  "/images/..."
 */
export function resolveImagePath(raw: string): string {
  if (!raw) return '';
  // Already an absolute public path
  if (raw.startsWith('/')) return raw;
  // Relative WP-content path
  const match = raw.match(/wp-content\/uploads\/(.+)$/);
  if (match) return `/images/${match[1]}`;
  return raw;
}

/** Format a WordPress date string (ISO) to a human-readable date. */
export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}
