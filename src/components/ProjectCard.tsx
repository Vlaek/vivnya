import { CornersOut } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../content/projects';

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  onOpen: (trigger: HTMLButtonElement) => void;
};

export function ProjectCard({ project, priority = false, onOpen }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <article className="project-card group flex w-full flex-col" data-featured={project.featured || undefined}>
      <button
        className="project-card__media relative block w-full cursor-pointer border-0 p-0 text-left"
        type="button"
        onClick={(event) => onOpen(event.currentTarget)}
        aria-label={t('work.viewGallery', { title: project.title })}
      >
        <img
          className="aspect-square w-full object-cover"
          src={project.image}
          alt={t(`${project.translationKey}.alt`)}
          style={{ objectPosition: project.focalPoint }}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
        <span className="pointer-events-none absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-black/65 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100">
          <CornersOut size={20} aria-hidden="true" />
        </span>
      </button>
      <div className="project-card__meta">
        <div>
          <h3>{project.title}</h3>
          <p>{t(`${project.translationKey}.category`)}</p>
        </div>
      </div>
    </article>
  );
}
