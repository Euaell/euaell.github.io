import type { SkillCategory } from './types';

export { type SkillCategory };

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['C#', 'Python', 'Go', 'TypeScript', 'SQL'],
  },
  {
    title: 'Backend',
    skills: ['ASP.NET Core', 'EF Core', 'FastAPI', 'Litestar', 'Node.js', 'gRPC', 'REST APIs'],
  },
  {
    title: 'Frontend',
    skills: ['HTMX', 'Alpine.js', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Security & PKI',
    skills: ['PKI & X.509', 'DigiCert & EJBCA', 'mTLS', 'OAuth 2.0 & OIDC', 'Secrets Management'],
  },
  {
    title: 'Infrastructure & Cloud',
    skills: ['Docker', 'Azure Pipelines', 'Azure Bicep', 'GCP (Cloud Run, GCS)', 'GitHub Actions', 'Linux', 'Nginx', 'Kubernetes (learning)'],
  },
  {
    title: 'Data & AI',
    skills: ['PostgreSQL', 'SQL Server', 'Redis', 'Vector Databases', 'RAG', 'Embeddings', 'LLM Tool Use (MCP)'],
  },
  {
    title: 'Spoken Languages',
    skills: ['English (Fluent)', 'Amharic (Native)', 'German (Beginner)'],
  },
];
