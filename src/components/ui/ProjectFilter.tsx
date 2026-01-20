import { useState } from 'react';

export interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
  repositoryLink: string;
  tags: string[];
  responsibilities: string[];
  featured: boolean;
}

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
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setSelected('All')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selected === 'All'
              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
              : 'glass hover:glass-strong text-white/80'
          }`}
        >
          All
        </button>
        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelected(tech)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selected === tech
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                : 'glass hover:glass-strong text-white/80'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div
            key={project.title}
            className="glass-card rounded-xl overflow-hidden card-hover group"
          >
            {/* Project Image */}
            <div className="aspect-video bg-gradient-to-br from-primary-900/50 to-accent-900/50 relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-white/70 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs glass text-white/80"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-3 py-1 rounded-full text-xs glass text-white/80">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary text-center py-2 text-sm"
                  >
                    Live Demo
                  </a>
                )}
                <a
                  href={project.repositoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    project.link ? 'flex-1' : 'w-full'
                  } btn-secondary text-center py-2 text-sm`}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-white/50">
            No projects found for this technology.
          </p>
        </div>
      )}
    </div>
  );
}
