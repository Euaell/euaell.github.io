import { useState } from 'react';
import type { Project } from '@/data/types';

interface Props {
  projects: Project[];
  technologies: string[];
}

export default function ProjectFilter({ projects, technologies }: Props) {
  const [selected, setSelected] = useState('All');

  const filtered =
    selected === 'All'
      ? projects
      : projects.filter((p) =>
          p.tags.some((tag) => tag.toLowerCase().includes(selected.toLowerCase()))
        );

  return (
    <div className="project-filter">
      <div className="flex flex-wrap justify-center gap-2.5 mb-12">
        <button
          onClick={() => setSelected('All')}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] transition-all duration-200 border ${
            selected === 'All'
              ? 'bg-white text-neutral-950 border-white font-medium'
              : 'border-white/10 text-white/70 hover:text-white hover:border-white/30 bg-white/[0.02]'
          }`}
        >
          All
        </button>
        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelected(tech)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] transition-all duration-200 border ${
              selected === tech
                ? 'bg-white text-neutral-950 border-white font-medium'
                : 'border-white/10 text-white/70 hover:text-white hover:border-white/30 bg-white/[0.02]'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <article
            key={project.title}
            className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title || 'Project Image'}
                loading="lazy"
                className="w-full h-full object-cover opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-neutral-950/70 via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/70"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/70">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {(project.link || project.repositoryLink) && (
                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${project.repositoryLink ? 'flex-1' : 'w-full'} btn-primary text-center py-2 text-sm`}
                    >
                      Live Demo
                    </a>
                  )}
                  {project.repositoryLink && (
                    <a
                      href={project.repositoryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${project.link ? 'flex-1' : 'w-full'} btn-secondary text-center py-2 text-sm`}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
