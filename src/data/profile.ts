import profileImage from '@/assets/profile.jpg';
import type { ProfileInfo, SocialLink } from './types';

const email = 'euaelmeko@gmail.com';

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: 'github', href: 'https://github.com/euaell', label: 'GitHub Profile', handle: '@euaell' },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/euael-eshete',
    label: 'LinkedIn Profile',
    handle: 'Euael Eshete',
  },
  { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com/euaell', label: 'Twitter Profile', handle: '@euaell' },
  { name: 'Email', icon: 'mail', href: `mailto:${email}`, label: 'Send Email', handle: email },
];

export const profileInfo: ProfileInfo = {
  name: 'Euael M. Eshete',
  email,
  title: 'Software Engineer',
  description: 'Software engineer at Securetron building certificate lifecycle management, licensing, and tenant isolation. Founder at ZafTech.',
  bio: 'Most of my work is in C# and .NET, with Python, Go, and TypeScript where they fit. I build multi-tenant SaaS, licensing engines, cryptographic workflows, and run my own cloud infrastructure.',
  location: 'Addis Ababa / Remote',
  image: profileImage,
  resumeUrl: 'https://euaell.me/cv',
  /** Rotated through in the hero headline */
  focusAreas: [
    'PKI & CLM Systems',
    'Multi-Tenant SaaS',
    'Licensing Engines',
    'Distributed Backends',
    'AI Agent Tools (MCP)',
    'Cloud Infrastructure',
  ],
  socialLinks,
};
