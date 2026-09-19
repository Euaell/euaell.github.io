import { siteLinks } from './profile';

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
    slug: 'convia',
    title: 'Convia',
    summary:
      'Conversational AI form builder that turns a PDF or a brief into a structured multi-turn interview, then extracts typed answers against a strict schema.',
    description:
      'A multi-tenant SaaS platform for building forms that respondents complete in conversation rather than through a static page. Declarative field schemas are compiled into constrained LLM interview workflows, so extraction stays anchored to the schema instead of drifting. Selected for the Google Africa Applied AI Lab.',
    role: 'Founder & lead engineer',
    year: '2025 · 2026',
    image: '/images/projects/convia-analytics.webp',
    imageAlt:
      'Convia analytics dashboard showing 43 total submissions, a 16 percent completion rate, and a drop-off funnel of 36 abandoned against 7 completed',
    link: siteLinks.convia,
    linkLabel: 'convia.zaftech.co',
    tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'pgvector', 'LLM', 'MCP'],
    highlights: [
      'Designed a schema compiler that maps declarative form fields onto constrained multi-turn LLM interview workflows.',
      'Built hybrid intake that parses uploaded documents and conversational answers into validated JSON in real time.',
      'Shipped an MCP tool server and public REST API so external agents can create forms and read structured submissions.',
      'Implemented multi-tenant workspace isolation with scoped roles, plus magic-link and anonymous responder modes.',
    ],
    featured: true,
  },
  {
    slug: 'relay',
    title: 'Relay',
    summary:
      'Curated tool and artifact registry for AI agents, with durable artifact delivery and a release pipeline that validates every image it publishes.',
    description:
      'Agents invoke versioned tools, observe asynchronous work, and receive artifacts through managed URLs. Acceptance is durable: the API returns 202 only after the run, its usage reservation, and its dispatch intent commit in a single transaction. Open source and in active development.',
    role: 'Creator & lead engineer',
    year: '2026',
    image: null,
    repositoryLink: siteLinks.relay,
    tags: ['Deno', 'TypeScript', 'Hono', 'PostgreSQL', 'Redis', 'S3', 'MCP'],
    highlights: [
      'Built the service on a transactional outbox so a 202 is never returned for work that cannot be dispatched.',
      'Made ambiguous provider submissions retry-safe: a classified retry table forbids blind resubmission and reconciles through provider idempotency keys.',
      'Set up release-please versioning across four GitHub Actions workflows, including SBOM generation, provenance attestation, and Trivy scanning that blocks on HIGH or CRITICAL findings.',
      'Used a GitHub App token rather than GITHUB_TOKEN specifically so a Release Please tag can trigger the downstream image-release workflow.',
    ],
    featured: true,
  },
  {
    slug: 'pki-trust-manager',
    title: 'PKI Trust Manager',
    summary:
      'Multi-tenant certificate lifecycle management platform, where I was the sole or lead developer across six services.',
    description:
      'A production SaaS platform for issuing, provisioning, and auditing X.509 certificates across customer tenants. Built at Securetron over eighteen months: 574 commits, 77 merged pull requests, spanning a licensing engine, third-party CA integrations, a discovery agent, and an embedded AI assistant.',
    role: 'Lead developer, six services',
    year: '2025 · 2026',
    image: null,
    tags: ['ASP.NET Core', 'EF Core', 'SQL Server', 'HTMX', 'Alpine.js', 'Azure', 'Docker'],    highlights: [
      'Built the licensing subsystem from scratch: online and offline activation, grace periods, certificate limits, and a read-only mode when a licence lapses.',
      'Ran security reviews that found and remediated an SSRF redirect bypass, several hardcoded credentials committed to source, and an authorization bypass in a superadmin gate.',
      'Led a frontend migration from static CSS to Tailwind with HTMX and Alpine.js, moving certificate inventory to server-rendered partial updates.',
      'Delivered a full DigiCert CertCentral integration and a provider-agnostic CA abstraction, plus Azure Pipelines CI/CD across six services.',
    ],
    featured: false,
  },
  {
    slug: 'mizan',
    title: 'Mizan',
    summary:
      'Personal health platform for meals, lifting, and body measurements, exposed to AI assistants over the Model Context Protocol.',
    description:
      'A daily-log application with recipe and macro tracking, workout templates, and progress history. Its distinguishing feature is a first-class MCP integration: connected clients such as Claude Desktop and Cursor can read and write the same data the UI does.',
    role: 'Designer & engineer',
    year: '2026',
    image: '/images/projects/mizan-daily-log.webp',
    imageAlt:
      'Mizan daily log showing 1,220 of 1,800 calories with protein, carbohydrate, and fat progress bars',
    tags: ['MCP', 'TypeScript', 'React', 'PostgreSQL'],
    highlights: [
      'Built an MCP server exposing typed tools including get_food_diary, log_meal_manual, create_workout_template, and list_exercises.',
      'Added token management and per-tool usage analytics, tracking call volume, success rate, and average response time.',
      'Designed a daily-log interface with macro progress, workout templates, and empty states that explain how to populate them.',
    ],
    featured: true,
  },
  {
    slug: 'distrokv',
    title: 'DistroKV',
    summary:
      'Distributed, fault-tolerant key-value store in Go implementing Raft consensus for leader election and replication.',
    description:
      'A systems project built to understand consensus from the inside: Raft for leader election and log replication, an LSM-tree storage engine for persistence, and a multi-region Kubernetes deployment used to test partition tolerance across three continents.',
    role: 'Creator',
    year: '2026 · present',
    image: null,
    repositoryLink: 'https://github.com/Euaell',
    tags: ['Go', 'Raft', 'LSM-tree', 'Kubernetes', 'Distributed Systems'],
    highlights: [
      'Implemented Raft consensus for leader election and data replication.',
      'Built an LSM-tree storage engine for durable writes.',
      'Deployed across three continents to validate geographic distribution and partition handling.',
    ],
    featured: false,
  },
  {
    slug: 'afrochat',
    title: 'AfroChat',
    summary:
      'Async messaging backend scaled from 1,250 to 58,000 monthly messages, with a RAG pipeline and a Telegram Mini-App client.',
    description:
      'An AI chat product built at A2SV. The backend moved from a monolith to containerised services on GCP Cloud Run, media moved to Cloud Storage with zero downtime, and a retrieval-augmented generation pipeline was added to ground answers in a vector store.',
    role: 'Software developer',
    year: '2023 · 2025',
    image: null,
    tags: ['FastAPI', 'LiteStar', 'GCP', 'RAG', 'Vector DB', 'Telegram'],
    highlights: [
      'Architected a non-blocking asynchronous backend in FastAPI and LiteStar, scaling to 58,000 monthly messages for 2,000 active users.',
      'Engineered a zero-downtime storage migration to GCP Cloud Storage that cut infrastructure overhead by 94 percent.',
      'Built a retrieval-augmented generation pipeline with vector search and prompt caching, lifting user retention by 30 percent.',
      'Shipped a Telegram Mini-App solving authentication and session handling inside the webview, onboarding 300 users.',
    ],
    featured: false,
  },
];

export const featuredProjects = projectsData.filter((p) => p.featured);
