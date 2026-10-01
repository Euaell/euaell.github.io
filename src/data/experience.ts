export interface ExperienceItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    date: "Mar 2025 - Present",
    title: "Software Developer",
    subtitle: "Securetron",
    location: "Remote / Addis Ababa, Ethiopia",
    description: [
      "Built the licensing engine for PKI Trust Manager: online and offline activation, grace periods, certificate limits, and read-only mode. Offline licenses verify locally with a signature check.",
      "Led the multi-tenant refactor: organisation-scoped license loading and queries, with tenant enforcement in middleware.",
      "Shipped DigiCert CertCentral orders, webhooks, encrypted API keys, and a feature-flagged rollout. Integrated EJBCA through provider abstractions shared by the certificate flows.",
      "Built a role-aware product assistant with stored conversations, audit logging, and versioned system prompts.",
      "Moved the portal to Tailwind, HTMX, and Alpine.js partials. Set up Azure Pipelines, Docker builds, and Bicep provisioning.",
    ],
  },
  {
    date: "2025 - Present",
    title: "Founder",
    subtitle: "ZafTech",
    location: "Addis Ababa, Ethiopia",
    description: [
      "Run a small software studio, designing, building, and hosting client work and products on a self-managed stack.",
      "Products include Convia, a conversational form platform, and Mizan, a nutrition and training tracker.",
    ],
  },
  {
    date: "Sep 2023 - Mar 2025",
    title: "Software Developer",
    subtitle: "AfroChat (A2SV)",
    location: "Addis Ababa, Ethiopia",
    description: [
      "Architected an async backend with FastAPI and LiteStar, scaling from 1,250 to 58,000 monthly messages for 2,000 active users.",
      "Engineered a zero-downtime migration to GCP Cloud Storage, cutting infrastructure overhead by 94%.",
      "Built a RAG pipeline with vector databases and OpenAI APIs, and optimized prompt caching to reduce latency and cost.",
      "Transitioned a monolith to containerized services on GCP Cloud Run with autoscaling based on CPU and latency metrics.",
      "Shipped a Telegram Mini-App wrapper that solved auth and session handling, onboarding 300 users.",
    ],
  },
  {
    date: "Jul 2023 - Sep 2023",
    title: "Software Developer",
    subtitle: "HISP Ethiopia",
    location: "Addis Ababa, Ethiopia",
    description: [
      "Customized DHIS2 modules with Java and Django to meet national health data reporting standards.",
      "Produced clear documentation for websites, DHIS2 customizations, and internal applications.",
    ],
  },
  {
    date: "Mar 2022 - Jun 2022",
    title: "Full Stack Intern",
    subtitle: "New Era Research and Development",
    location: "Addis Ababa, Ethiopia",
    description: [
      "Built a functional prototype for a 3-axis CNC machine control system using Arduino.",
      "Delivered a full-stack internet onboarding application in C# with a custom backend.",
    ],
  },
];
