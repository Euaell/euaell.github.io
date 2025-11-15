import { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repositoryLink: string;
  featured?: boolean;
  responsibilities: string[];
  image?: string;
}

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  href: string;
  color: string;
  ariaLabel: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: string;
}

export interface Experience {
  date: string;
  location: string;
  title: string;
  subtitle: string;
  descriptions: string[];
}

export interface Education {
  date: string;
  title: string;
  institution: string;
  location: string;
  descriptions: string[];
}

export const ANIMATION_CONFIG = {
  durations: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    verySlow: 1.2,
  },
  delays: {
    none: 0,
    short: 0.1,
    medium: 0.3,
    long: 0.5,
  },
  spring: {
    gentle: { stiffness: 100, damping: 20 },
    normal: { stiffness: 200, damping: 25 },
    snappy: { stiffness: 300, damping: 30 },
  },
} as const;
