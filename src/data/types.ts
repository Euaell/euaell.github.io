import type { ImageMetadata } from 'astro';

export interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
  repositoryLink?: string;
  tags: string[];
  responsibilities: string[];
  featured: boolean;
}

/** An entry in the experience, education or mentoring timelines */
export interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export type SocialIconName = 'github' | 'linkedin' | 'twitter' | 'mail';

export interface SocialLink {
  name: string;
  icon: SocialIconName;
  href: string;
  label: string;
  /** Short display value, e.g. a username */
  handle: string;
}

export interface NavItem {
  name: string;
  href: `#${string}`;
}

export interface ProfileInfo {
  name: string;
  email: string;
  title: string;
  description: string;
  bio: string;
  location: string;
  image: ImageMetadata;
  resumeUrl: string;
  focusAreas: string[];
  socialLinks: SocialLink[];
}
