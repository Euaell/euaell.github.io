export interface ExperienceItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    date: 'Mar 2025 - Present',
    title: 'Software Developer',
    subtitle: 'SecureTron',
    location: 'Remote / Addis Ababa, Ethiopia',
    description: [
      'Designed and implemented the RBAC module for a client-facing security dashboard in ASP.NET Core to isolate tenants.',
      'Standardized the deployment pipeline by containerizing legacy .NET services with Docker to improve dev-prod parity.',
      'Optimized Razor Pages rendering for dense data grids to reduce time-to-interactive.',
    ],
  },
  {
    date: 'Sep 2023 - Mar 2025',
    title: 'Software Developer',
    subtitle: 'AfroChat (A2SV)',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Architected an async backend with FastAPI and LiteStar, scaling from 1,250 to 58,000 monthly messages for 2,000 active users.',
      'Engineered a zero-downtime migration to GCP Cloud Storage, cutting infrastructure overhead by 94%.',
      'Built a RAG pipeline with vector databases and OpenAI APIs, and optimized prompt caching to reduce latency and cost.',
      'Transitioned a monolith to containerized services on GCP Cloud Run with autoscaling based on CPU and latency metrics.',
      'Shipped a Telegram Mini-App wrapper that solved auth and session handling, onboarding 300 users.',
    ],
  },
  {
    date: 'Jul 2023 - Sep 2023',
    title: 'Software Developer',
    subtitle: 'HISP Ethiopia',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Customized DHIS2 modules with Java and Django to meet national health data reporting standards.',
      'Produced clear documentation for websites, DHIS2 customizations, and internal applications.',
    ],
  },
  {
    date: 'Mar 2022 - Jun 2022',
    title: 'Full Stack Intern',
    subtitle: 'New Era Research and Development',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Built a functional prototype for a 3-axis CNC machine control system using Arduino.',
      'Delivered a full-stack internet onboarding application in C# with a custom backend.',
    ],
  },
];
