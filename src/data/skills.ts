export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming',
    skills: ['Python', 'C#/.NET', 'SQL', 'JavaScript/TypeScript', 'Go'],
  },
  {
    title: 'Backend',
    skills: ['FastAPI', 'LiteStar', 'ASP.NET Core', 'gRPC', 'REST APIs', 'Microservices'],
  },
  {
    title: 'AI Engineering',
    skills: ['RAG Architectures', 'Vector Embeddings', 'LLM Tooling', 'Prompt Engineering'],
  },
  {
    title: 'Infrastructure',
    skills: ['Docker', 'GCP Cloud Run', 'GCS', 'CI/CD (GitHub Actions)', 'Linux', 'Kubernetes (Learning)'],
  },
  {
    title: 'Data & Storage',
    skills: ['PostgreSQL', 'Redis', 'MongoDB', 'Vector Databases'],
  },
  {
    title: 'Languages',
    skills: ['English (Proficient)', 'Amharic (Native)', 'Deutsch (Beginner)'],
  },
];
