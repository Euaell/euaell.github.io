import { useMemo, useState } from 'react';
import '@/styles/projects-filter.css';

/** Shape handed down from `projects.astro`. Kept narrow on purpose: the
 *  filter page only needs presentation fields, not the full project record. */
export interface ProjectCard {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  image: string | null;
  imageAlt?: string;
  link?: string;
  repositoryLink?: string;
  featured: boolean;
}

interface Props {
  projects: ProjectCard[];
}

export default function ProjectFilter({ projects }: Props) {
  const [selected, setSelected] = useState<string>('All');

  // Derived rather than passed in, so the filter can never drift from the data.
  const technologies = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tag of project.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    // Only offer a filter that actually narrows the set to something useful.
    return [...counts.entries()]
      .filter(([, count]) => count > 1 || count === 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [projects]);

  const filtered = useMemo(
    () =>
      selected === 'All'
        ? projects
        : projects.filter((project) => project.tags.includes(selected)),
    [projects, selected]
  );

  return (
    <div>
      <div className="filter-bar" role="group" aria-label="Filter projects by technology">
        <button
          type="button"
          className={`filter-chip${selected === 'All' ? ' is-selected' : ''}`}
          aria-pressed={selected === 'All'}
          onClick={() => setSelected('All')}
        >
          All
          <span className="filter-count">{projects.length}</span>
        </button>

        {technologies.map((tech) => {
          const count = projects.filter((p) => p.tags.includes(tech)).length;
          const isSelected = selected === tech;
          return (
            <button
              key={tech}
              type="button"
              className={`filter-chip${isSelected ? ' is-selected' : ''}`}
              aria-pressed={isSelected}
              onClick={() => setSelected(tech)}
            >
              {tech}
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="filter-status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        {selected !== 'All' ? ` tagged ${selected}` : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">Nothing tagged {selected}</p>
          <p className="meta">
            Try another technology, or{' '}
            <button type="button" className="link empty-reset" onClick={() => setSelected('All')}>
              show everything
            </button>
            .
          </p>
        </div>
      ) : (
        <ul className="project-grid">
          {filtered.map((project) => (
            <li key={project.slug}>
              <article className={`card project-card${project.image ? '' : ' project-card--no-media'}`}>
                {project.image && (
                  <div className="project-media">
                    <img
                      src={project.image}
                      alt={project.imageAlt ?? ''}
                      loading="lazy"
                      decoding="async"
                      width="1600"
                      height="1000"
                    />
                  </div>
                )}

                <div className="project-body">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-summary">{project.summary}</p>

                  <ul className="project-tags">
                    {project.tags.slice(0, 4).map((tag) => (
                      <li key={tag} className="tag">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <p className="project-links">
                    {project.link && (
                      <a className="link" href={project.link} target="_blank" rel="noopener noreferrer">
                        Visit
                      </a>
                    )}
                    {project.link && project.repositoryLink && (
                      <span className="sep" aria-hidden="true">
                        ·
                      </span>
                    )}
                    {project.repositoryLink && (
                      <a
                        className="link"
                        href={project.repositoryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source
                      </a>
                    )}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
