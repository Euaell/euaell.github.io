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

export interface ExperienceItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export interface EducationItem {
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

export interface MentoringItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export interface SocialLink {
  name: string;
  icon: string;
  href: string;
  label: string;
}

export interface ProfileInfo {
  name: string;
  email: string;
  title: string;
  tagline: string;
  description: string;
  bio: string;
  location: string;
  image: ImageMetadata;
  resumeUrl: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  profile: ProfileInfo;
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  mentoring: MentoringItem[];
}

export interface PortfolioDataProvider {
  getProfile(): Promise<ProfileInfo> | ProfileInfo;
  getProjects(): Promise<Project[]> | Project[];
  getExperience(): Promise<ExperienceItem[]> | ExperienceItem[];
  getEducation(): Promise<EducationItem[]> | EducationItem[];
  getSkills(): Promise<SkillCategory[]> | SkillCategory[];
  getMentoring(): Promise<MentoringItem[]> | MentoringItem[];
  getAll(): Promise<PortfolioData> | PortfolioData;
}
