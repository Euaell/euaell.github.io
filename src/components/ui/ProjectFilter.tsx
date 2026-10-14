import { useState } from 'react';
import type { Project } from '@/data/types';
import ProjectCard from './ProjectCard';

interface Props {
  projects: Project[];
  technologies: string[];
}

const ALL = 'All';

export default function ProjectFilter({ projects, technologies }: Props) {
  const [selected, setSelected] = useState(ALL);

  const filtered = selected === ALL ? projects : projects.filter((p) => p.tags.includes(selected));

  return (
    <div>
      {/* One swipeable row on phones, a centred wrap from md up */}
      <div
        className="no-scrollbar -mx-4 mb-12 flex snap-x scroll-px-4 gap-2.5 overflow-x-auto px-4 py-1 mask-r-from-85% md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:mask-none"
        role="group"
        aria-label="Filter projects by technology"
      >
        {[ALL, ...technologies].map((tech) => {
          const isSelected = selected === tech;
          return (
            <button
              key={tech}
              type="button"
              onClick={() => setSelected(tech)}
              aria-pressed={isSelected}
              className="shrink-0 snap-start rounded-full border border-white/10 bg-white/2 px-4 py-2 whitespace-nowrap text-xs tracking-label text-white/70 uppercase transition-colors duration-200 hover:border-white/30 hover:text-white aria-pressed:border-white aria-pressed:bg-white aria-pressed:font-medium aria-pressed:text-neutral-950"
            >
              {tech}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} shown
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
