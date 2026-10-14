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
      'Mentored more than 150 students in full-stack development, LLM integration, and cloud architectures.',
    ],
  },
  {
    date: 'Mar 2022 - Jun 2022',
    title: 'Mentor',
    subtitle: 'Solvers Club, Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Helped first-year students with university transition and STEM course foundations.',
    ],
  },
];

export const profileInfo = {
  name: 'Euael M. Eshete',
  email: 'euaelmeko@gmail.com',
  title: 'Software Engineer',
  tagline: 'PKI, Multi-Tenant SaaS & Cloud Systems',
  description: 'Software engineer at Securetron building certificate lifecycle management, licensing, and tenant isolation. Founder at ZafTech.',
  bio: 'Most of my work is in C# and .NET, with Python, Go, and TypeScript where they fit. I build multi-tenant SaaS, licensing engines, cryptographic workflows, and run my own cloud infrastructure.',
  location: 'Addis Ababa / Remote',
  image: profileImage,
};
