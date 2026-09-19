import profileImage from '@/assets/profile.jpg';

export interface MentoringItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export const mentoringData: MentoringItem[] = [
  {
    date: 'Sep 2023 - Mar 2025',
    title: 'Mentor',
    subtitle: 'Africa to Silicon Valley (A2SV)',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Mentored 150+ students in full-stack development, AI/LLM integration, and cloud technologies.',
    ],
  },
  {
    date: 'Mar 2022 - Jun 2022',
    title: 'Mentor',
    subtitle: 'Solvers, Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Guided first-year students through university life and STEM foundations.',
    ],
  },
];

/** Single source of truth for outbound identity links. */
export const siteLinks = {
  github: 'https://github.com/euaell',
  linkedin: 'https://www.linkedin.com/in/euael-eshete',
  email: 'euaelmeko@gmail.com',
  /** External redirect; the CV itself is served from the euaell.me domain. */
  resume: 'https://euaell.me/cv',
  studio: 'https://zaftech.co',
  convia: 'https://convia.zaftech.co',
  relay: 'https://github.com/zaftec/relay',
} as const;

export const profileInfo = {
  name: 'Euael M. Eshete',
  title: 'Software Engineer',
  tagline: 'I build backend systems that hold up under load, and AI products people actually use.',
  description:
    'Software engineer in Addis Ababa working across high-concurrency backend platforms, cloud infrastructure, and AI-native products.',
  bio: 'Founder of ZafTech and lead engineer on production systems across PKI, conversational AI, and distributed infrastructure. Four years of shipping software that has to survive real traffic.',
  location: 'Addis Ababa, Ethiopia',
  availability: '4+ years experience',
  image: profileImage,
};
