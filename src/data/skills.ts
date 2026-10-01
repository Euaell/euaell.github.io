export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["C#/.NET", "Python", "Go", "TypeScript", "SQL"],
  },
  {
    title: "Backend",
    skills: [
      "ASP.NET Core",
      "EF Core",
      "FastAPI",
      "LiteStar",
      "REST APIs",
      "HTMX",
      "Alpine.js",
    ],
  },
  {
    title: "AI Engineering",
    skills: ["MCP", "Schema-constrained LLM workflows", "RAG", "Vector search"],
  },
  {
    title: "Infrastructure",
    skills: [
      "Azure Pipelines",
      "Bicep",
      "Docker",
      "GitHub Actions",
      "GCP Cloud Run",
      "Linux",
    ],
  },
  {
    title: "Data & Storage",
    skills: ["PostgreSQL", "SQL Server", "Redis", "MongoDB", "pgvector"],
  },
  {
    title: "Languages",
    skills: ["English (Proficient)", "Amharic (Native)", "Deutsch (Beginner)"],
  },
];
