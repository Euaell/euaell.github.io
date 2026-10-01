import { siteLinks } from "./profile";

export interface Project {
  /** Stable slug, also used to derive the screenshot filename. */
  slug: string;
  title: string;
  /** One line, plain language, no adjectives doing the work of evidence. */
  summary: string;
  /** What it actually is, for the detail view. */
  description: string;
  role: string;
  year: string;
  /**
   * Real screenshot, or null. Several projects are closed-source or have no
   * capture available; those render a text-first card rather than a stand-in
   * image, because a generic placeholder reads as filler.
   */
  image: string | null;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  link?: string;
  linkLabel?: string;
  repositoryLink?: string;
  tags: string[];
  /** Concrete contributions, drawn from the CV and contribution extracts. */
  highlights: string[];
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    slug: "rms",
    title: "RMS",
    summary:
      "Restaurant operations spanning tables, orders, staff, inventory, and billing, with tenant-scoped session and payment lifecycles.",
    description:
      "A restaurant management system developed at ZafTech. The engineering work connects table sessions, orders, and payments while keeping operations scoped to the correct tenant.",
    role: "Full-stack engineering",
    year: "2026",
    image: null,
    tags: ["ASP.NET Core", "Next.js", "PostgreSQL", "Redis", "CQRS", "Docker"],
    highlights: [
      "Implemented table-session and payment lifecycle handling with tenant-scoped operations.",
      "Used CQRS and MediatR to separate application commands from queries.",
      "Added integration tests against PostgreSQL for lifecycle behaviour and data boundaries.",
    ],
    featured: false,
  },
  {
    slug: "project-life-manager",
    title: "Project Life Manager",
    summary:
      "A personal-record and daily-planning system with database-level tenant isolation, idempotent commands, and a quarantined file pipeline.",
    description:
      "An actively developed system for tasks, notes, journals, saved items, and files, with web, Telegram, and AI interactions. The current work focuses on the security and reliability of its underlying services.",
    role: "Full-stack & systems engineering",
    year: "In development",
    image: null,
    tags: [
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Next.js",
      "S3",
      "ClamAV",
    ],
    highlights: [
      "Implemented transaction-local tenant identity for PostgreSQL row-level security, with concurrent isolation tests against a real database.",
      "Built command idempotency and a transactional outbox for reliable background work.",
      "Quarantined file uploads and blocked access until a ClamAV scan returned a clean result.",
    ],
    featured: false,
  },
  {
    slug: "convia",
    title: "Convia",
    summary:
      "Conversational AI form builder that turns a PDF or a brief into a structured multi-turn interview, then extracts typed answers against a strict schema.",
    description:
      "A multi-tenant SaaS platform for building forms that respondents complete in conversation rather than through a static page. Declarative field schemas are compiled into constrained LLM interview workflows, so extraction stays anchored to the schema instead of drifting. Selected for the Google Africa Applied AI Lab.",
    role: "Founder & lead engineer",
    year: "2025 · 2026",
    image: "/images/projects/convia-editor.webp",
    imageWidth: 1500,
    imageHeight: 906,
    imageAlt: "Convia form editor with typed questions and publishing controls",
    link: siteLinks.convia,
    linkLabel: "convia.zaftech.co",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "pgvector", "LLM", "MCP"],
    highlights: [
      "Designed a schema compiler that maps declarative form fields onto constrained multi-turn LLM interview workflows.",
      "Built hybrid intake that parses uploaded documents and conversational answers into validated JSON in real time.",
      "Shipped an MCP tool server and public REST API so external agents can create forms and read structured submissions.",
      "Implemented multi-tenant workspace isolation with scoped roles, plus magic-link and anonymous responder modes.",
    ],
    featured: true,
  },
  {
    slug: "relay",
    title: "Relay",
    summary:
      "Curated tool and artifact registry for AI agents, with durable artifact delivery and a release pipeline that validates every image it publishes.",
    description:
      "Agents invoke versioned tools, observe asynchronous work, and receive artifacts through managed URLs. Acceptance is durable: the API returns 202 only after the run, its usage reservation, and its dispatch intent commit in a single transaction. Open source and in active development.",
    role: "Creator & lead engineer",
    year: "2026",
    image: null,
    repositoryLink: siteLinks.relay,
    tags: ["Deno", "TypeScript", "Hono", "PostgreSQL", "Redis", "S3", "MCP"],
    highlights: [
      "Built the service on a transactional outbox so a 202 is never returned for work that cannot be dispatched.",
      "Made ambiguous provider submissions retry-safe: a classified retry table forbids blind resubmission and reconciles through provider idempotency keys.",
      "Set up release-please versioning across four GitHub Actions workflows, including SBOM generation, provenance attestation, and Trivy scanning that blocks on HIGH or CRITICAL findings.",
      "Used a GitHub App token rather than GITHUB_TOKEN specifically so a Release Please tag can trigger the downstream image-release workflow.",
    ],
    featured: true,
  },
  {
    slug: "pki-trust-manager",
    title: "PKI Trust Manager",
    summary:
      "Certificate lifecycle management for multiple customer organisations, with licensing, tenant isolation, and integrated certificate providers.",
    description:
      "At Securetron, I build the systems around certificate lifecycle management: the license policy that governs use, the tenant boundaries that isolate customer data, and provider integrations that issue and manage certificates.",
    role: "Software Developer · Securetron",
    year: "2025 · 2026",
    image: null,
    tags: [
      "ASP.NET Core",
      "EF Core",
      "SQL Server",
      "HTMX",
      "Alpine.js",
      "Azure",
      "Bicep",
      "Docker",
    ],
    highlights: [
      "Built the licensing subsystem from scratch: online and offline activation, grace periods, certificate limits, and a read-only mode when a licence lapses.",
      "Led the multi-tenant refactor: licenses and queries scope to the organisation, with tenant enforcement in middleware.",
      "Led a frontend migration from static CSS to Tailwind with HTMX and Alpine.js, moving certificate inventory to server-rendered partial updates.",
      "Shipped DigiCert CertCentral orders and webhooks with API keys encrypted at rest, and integrated EJBCA through shared CA abstractions.",
      "Built a role-aware assistant with conversation storage, audit logging, and versioned system prompts; set up Azure Pipelines, Docker builds, and Bicep provisioning.",
    ],
    featured: false,
  },
  {
    slug: "mizan",
    title: "Mizan",
    summary:
      "Personal health platform for meals, lifting, and body measurements, exposed to AI assistants over the Model Context Protocol.",
    description:
      "A daily-log application with recipe and macro tracking, workout templates, and progress history. Its distinguishing feature is a first-class MCP integration: connected clients such as Claude Desktop and Cursor can read and write the same data the UI does.",
    role: "Designer & engineer",
    year: "2026",
    image: "/images/projects/mizan-showcase.webp",
    imageWidth: 1440,
    imageHeight: 960,
    imageAlt:
      "Mizan daily log with nutrition, meals, and training, shown with demo data",
    tags: ["MCP", "TypeScript", "React", "PostgreSQL"],
    highlights: [
      "Built an MCP server exposing typed tools including get_food_diary, log_meal_manual, create_workout_template, and list_exercises.",
      "Added token management and per-tool usage analytics, tracking call volume, success rate, and average response time.",
      "Designed a daily-log interface with macro progress, workout templates, and empty states that explain how to populate them.",
    ],
    featured: true,
  },
  {
    slug: "distrokv",
    title: "DistroKV",
    summary:
      "An in-progress systems project exploring Raft consensus and persistent key-value storage in Go.",
    description:
      "A project for studying leader election, log replication, and storage-engine design. The current scope is exploratory; persistent storage and multi-region deployment remain work in progress.",
    role: "Personal systems project",
    year: "In progress",
    image: null,
    tags: ["Go", "Raft", "Distributed Systems"],
    highlights: [
      "Exploring Raft leader election and log replication.",
      "Working toward persistent storage and partition-tolerance testing.",
    ],
    featured: false,
  },
  {
    slug: "afrochat",
    title: "AfroChat",
    summary:
      "Async messaging backend scaled from 1,250 to 58,000 monthly messages, with a RAG pipeline and a Telegram Mini-App client.",
    description:
      "An AI chat product built at A2SV. The backend moved from a monolith to containerised services on GCP Cloud Run, media moved to Cloud Storage with zero downtime, and a retrieval-augmented generation pipeline was added to ground answers in a vector store.",
    role: "Software developer",
    year: "2023 · 2025",
    image: null,
    tags: ["FastAPI", "LiteStar", "GCP", "RAG", "Vector DB", "Telegram"],
    highlights: [
      "Architected a non-blocking asynchronous backend in FastAPI and LiteStar, scaling to 58,000 monthly messages for 2,000 active users.",
      "Engineered a zero-downtime storage migration to GCP Cloud Storage that cut infrastructure overhead by 94 percent.",
      "Built a retrieval-augmented generation pipeline with vector search and prompt caching.",
      "Shipped a Telegram Mini-App solving authentication and session handling inside the webview, onboarding 300 users.",
    ],
    featured: false,
  },
];

export const featuredProjects = projectsData.filter((p) => p.featured);
