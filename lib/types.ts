// ─── Domain Types ──────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  slug: string;
  title: string;
  overview: string;
  details: string[];
  headings: string[];
  images: string[];
  nextjs_route: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content_blocks: string[];
  strategies: string[];
  images: string[];
  nextjs_route: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  date: string;
  status: string;
  content_html: string;
  excerpt_html: string;
  categories: number[];
  tags: number[];
  nextjs_route: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  cta?: boolean;
  children?: { label: string; href: string }[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  phone_display: string;
  hours: string[];
}

export interface SiteConfig {
  brand_name: string;
  tagline: string;
  hero_title: string;
  hero_subtitle: string;
  about_bio: string;
  metrics: Metric[];
  capabilities: { label: string; percent: number }[];
  contact: ContactInfo;
  socials: Record<string, string>;
  navigation: NavItem[];
  copyright: string;
}
