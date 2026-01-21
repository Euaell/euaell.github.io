export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface ProjectHighlight {
  name: string;
  description: string;
}

export interface MentoringItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export const profileStats: Stat[] = [
  { label: 'Monthly messages scaled', value: 58, suffix: 'k+' },
  { label: 'Active users supported', value: 2, suffix: 'k+' },
  { label: 'Students mentored', value: 150, suffix: '+' },
  { label: 'Infra cost reduction', value: 94, suffix: '%' },
];

export const projectHighlights: ProjectHighlight[] = [
  {
    name: 'DistroKV (Current)',
    description: 'Distributed KV store in Go with Raft consensus, LSM-tree persistence, and multi-region Kubernetes testing.',
  },
  {
    name: 'IoT Water Distribution System (Thesis)',
    description: 'Low-power embedded monitoring with a cloud data pipeline for resource-constrained environments.',
  },
];

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
  availability: 'Remote friendly',
  image: '/images/profile.jpg',
};
