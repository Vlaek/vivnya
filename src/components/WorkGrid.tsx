import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projects, type Project } from '../content/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectLightbox } from './ProjectLightbox';

export function WorkGrid() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  const closeLightbox = useCallback(() => {
    setSelectedProject(null);
    requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  return (
    <section className="work section-shell" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="section-eyebrow">{t('work.eyebrow')}</p>
        <h2 id="work-title">{t('work.title')}</h2>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={index === 0}
            onOpen={(trigger) => {
              returnFocusRef.current = trigger;
              setSelectedProject(project);
            }}
          />
        ))}
      </div>
      {selectedProject ? <ProjectLightbox key={selectedProject.id} project={selectedProject} onClose={closeLightbox} /> : null}
    </section>
  );
}
