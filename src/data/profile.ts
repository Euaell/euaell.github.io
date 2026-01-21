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

export const profileInfo = {
  name: 'Euael M. Eshete',
  title: 'Software Developer',
  tagline: 'Building reliable systems with practical AI.',
  description: 'Full-stack software developer specializing in scalable backend platforms, cloud infrastructure, and AI-enabled products.',
  bio: 'Software developer focused on high-concurrency systems, cloud-native delivery, and AI tooling that improves real products.',
  location: 'Addis Ababa, Ethiopia',
  availability: '4+ years experience',
  image: '/images/profile.jpg',
};
