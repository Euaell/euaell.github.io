import { useMemo, useState } from "react";
import "@/styles/projects-filter.css";

export interface ProjectCard {
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  year: string;
  highlights: string[];
  tags: string[];
  image: string | null;
  imageAlt?: string;
  link?: string;
  repositoryLink?: string;
  featured: boolean;
}
export default function ProjectFilter({
  projects,
}: {
  projects: ProjectCard[];
}) {
  const [selected, setSelected] = useState("All");
  const technologies = useMemo(
    () => [...new Set(projects.flatMap((project) => project.tags))].sort(),
    [projects],
  );
  const filtered =
    selected === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(selected));
  return (
    <div>
      <div className="filter-bar">
        <p className="filter-status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {selected !== "All" ? " · " + selected : ""}
        </p>
        <div className="filter-control">
          <label htmlFor="technology">Technology</label>
          <select
            id="technology"
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
          >
            <option value="All">All technologies</option>
            {technologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="project-grid">
        {filtered.map((project) => (
          <li key={project.slug} id={project.slug}>
            <article className="project-card">
              <header className="project-heading">
                <h2>
                  <a href={"/projects/" + project.slug}>{project.title}</a>
                </h2>
                <p className="project-meta">
                  {project.role} · {project.year}
                </p>
                {project.image && (
                  <figure>
                    <img
                      className="project-thumb"
                      src={project.image}
                      alt={project.imageAlt ?? ""}
                      loading="lazy"
                      decoding="async"
                      width="1500"
                      height="1000"
                    />
                    {project.slug === "mizan" && (
                      <figcaption className="project-image-caption">
                        Shown with demo data.
                      </figcaption>
                    )}
                  </figure>
                )}
              </header>
              <div className="project-body">
                <p className="project-summary">{project.summary}</p>
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <details className="project-details">
                  <summary>
                    Engineering details{" "}
                    <span aria-hidden="true">
                      <svg
                        className="ui-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div>
                    <p>{project.description}</p>
                    <ul>
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </details>
                {(project.link || project.repositoryLink) && (
                  <p className="project-links">
                    {project.link && (
                      <a
                        className="text-link"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit project{" "}
                        <span aria-hidden="true">
                          <svg
                            className="ui-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden="true"
                          >
                            <path d="M5 19 19 5M5 5h14v14" />
                          </svg>
                        </span>
                      </a>
                    )}
                    {project.repositoryLink && (
                      <a
                        className="text-link"
                        href={project.repositoryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source code{" "}
                        <span aria-hidden="true">
                          <svg
                            className="ui-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden="true"
                          >
                            <path d="M5 19 19 5M5 5h14v14" />
                          </svg>
                        </span>
                      </a>
                    )}
                  </p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
