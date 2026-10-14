import type { CSSProperties } from 'react';
import type { Project } from '@/data/types';

interface Props {
  project: Project;
  className?: string;
  /** Stagger for the `reveal` entrance animation */
  delayMs?: number;
}

const MAX_TAGS = 3;

const tagClass = 'rounded-md border border-white/10 bg-white/3 px-2.5 py-1 text-xs text-white/70';

export default function ProjectCard({ project, className = '', delayMs }: Props) {
  const { title, description, image, tags, link, repositoryLink } = project;
  const hiddenTags = tags.length - MAX_TAGS;

  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-white/25 ${className}`}
      style={delayMs ? ({ '--delay': `${delayMs}ms` } as CSSProperties) : undefined}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-neutral-950/70 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-white/70">{description}</p>

        <ul className="mb-4 flex flex-wrap gap-2" aria-label="Technologies">
          {tags.slice(0, MAX_TAGS).map((tag) => (
            <li key={tag} className={tagClass}>
              {tag}
            </li>
          ))}
          {hiddenTags > 0 && (
            <li className={tagClass} title={tags.slice(MAX_TAGS).join(', ')}>
              +{hiddenTags}
              <span className="sr-only"> more: {tags.slice(MAX_TAGS).join(', ')}</span>
            </li>
          )}
        </ul>

        {(link || repositoryLink) && (
          <div className="flex gap-3">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 py-2 text-center text-sm"
              >
                Live Demo<span className="sr-only"> of {title} (opens in a new tab)</span>
              </a>
            )}
            {repositoryLink && (
              <a
                href={repositoryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 py-2 text-center text-sm"
              >
                GitHub<span className="sr-only"> repository for {title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
