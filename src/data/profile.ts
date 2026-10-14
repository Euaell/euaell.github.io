import profileImage from '@/assets/profile.jpg';
import type { MentoringItem, ProfileInfo, SocialLink } from './types';

export { type MentoringItem, type ProfileInfo, type SocialLink };

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

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: 'github', href: 'https://github.com/euaell', label: 'GitHub Profile' },
  { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/euael-eshete', label: 'LinkedIn Profile' },
  { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com/euaell', label: 'Twitter Profile' },
  { name: 'Email', icon: 'mail', href: 'mailto:euaelmeko@gmail.com', label: 'Send Email' },
];

export const profileInfo: ProfileInfo = {
  name: 'Euael M. Eshete',
  email: 'euaelmeko@gmail.com',
  title: 'Software Engineer',
  tagline: 'PKI, Multi-Tenant SaaS & Cloud Systems',
  description: 'Software engineer at Securetron building certificate lifecycle management, licensing, and tenant isolation. Founder at ZafTech.',
  bio: 'Most of my work is in C# and .NET, with Python, Go, and TypeScript where they fit. I build multi-tenant SaaS, licensing engines, cryptographic workflows, and run my own cloud infrastructure.',
  location: 'Addis Ababa / Remote',
  image: profileImage,
  resumeUrl: 'https://euaell.me/cv',
  socialLinks,
};
