import type { TimelineItem } from './types';

export const experienceData: TimelineItem[] = [
  {
    date: 'Mar 2025 - Present',
    title: 'Software Developer',
    subtitle: 'Securetron (PKI Trust Manager)',
    location: 'Addis Ababa / Remote',
    description: [
      'Built the licensing engine handling online/offline activation, grace periods, certificate limits, and cryptographic signature checks.',
      'Led the multi-tenant refactor ensuring licenses load per organisation, queries scope to customers, and middleware enforces isolation.',
      'Shipped DigiCert CertCentral end-to-end (orders, webhooks, encrypted keys) and integrated EJBCA with robust CA abstractions.',
      'Built an embedded AI assistant featuring persistent conversations, role-based access, audit logging, and versioned prompts.',
      'Migrated the portal UI to Tailwind CSS and server-rendered HTMX and Alpine.js partials for fast, reactive updates.',
      'Configured Azure Pipelines CI/CD, Docker multi-stage builds, and Azure Bicep for automated multi-tenant provisioning.',
    ],
  },
  {
    date: '2025 - Present',
    title: 'Founder & Lead Engineer',
    subtitle: 'ZafTech',
    location: 'zaftech.co',
    description: [
      'Design, build, and host client software and proprietary SaaS products on a modern self-managed infrastructure.',
      'Shipped Convia: conversational AI form builder with declarative schema compilation into constrained multi-turn LLM workflows.',
      'Shipped Mizan: personal health and nutrition platform with first-class Model Context Protocol (MCP) integrations.',
    ],
  },
  {
    date: 'Sep 2023 - Mar 2025',
    title: 'Software Developer',
    subtitle: 'AfroChat (A2SV)',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Architected high-throughput asynchronous backend APIs in FastAPI and Litestar, serving thousands of active users.',
      'Engineered a zero-downtime migration of media assets to Google Cloud Storage, reducing asset delivery infrastructure costs by 94%.',
      'Built a retrieval-augmented generation (RAG) pipeline leveraging vector databases and OpenAI APIs with prompt caching.',
      'Migrated monolithic services to containerized deployments on GCP Cloud Run with autoscaling on CPU and latency metrics.',
    ],
  },
  {
    date: 'Mar 2022 - Jun 2022',
    title: 'Full-Stack Intern',
    subtitle: 'New Era Research and Development',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Built a functional control system prototype for a 3-axis CNC machine using Arduino microcontrollers.',
      'Delivered a full-stack internet onboarding application with C# and ASP.NET.',
    ],
  },
];
