import { ArrowUpRight, CaretLeft, CaretRight, X } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import type { Project } from '../content/projects';

type ProjectLightboxProps = { project: Project; onClose: () => void };

export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const image = project.gallery[index];
  const total = project.gallery.length;

  const showPrevious = () => setIndex((current) => (current - 1 + total) % total);
  const showNext = () => setIndex((current) => (current + 1) % total);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
      if (event.key === 'Tab') {
        const controls = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
        );
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, total]);

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex bg-black text-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto flex h-dvh w-full max-w-[1600px] flex-col px-4 py-4 md:px-8 md:py-6">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div className="min-w-0">
            <h2 id="lightbox-title" className="truncate font-[Unbounded] text-base font-semibold md:text-xl">
              {project.title}
            </h2>
            <p className="mt-1 text-xs tracking-[0.08em] text-white/55 uppercase">{index + 1} / {total}</p>
          </div>
          <div className="flex items-center gap-2">
            <a className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm transition-colors duration-200 ease-out hover:border-white/50 hover:bg-white/10 active:scale-[0.97]" href={project.href} target="_blank" rel="noreferrer" aria-label={t('work.open', { title: project.title })}>
              <span className="max-sm:hidden">ArtStation</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <button ref={closeButtonRef} className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/20 transition-colors duration-200 ease-out hover:border-white/50 hover:bg-white/10 active:scale-[0.97]" type="button" onClick={onClose} aria-label={t('lightbox.close')}>
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div
          className="relative flex min-h-0 flex-1 items-center justify-center py-4 md:px-16"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <img className="max-h-full max-w-full object-contain" src={image.src} alt={t(image.altKey)} />
          <button className="absolute left-0 grid size-11 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/55 transition-colors duration-200 ease-out hover:border-white/50 hover:bg-white/10 active:scale-[0.97] max-md:bottom-4 max-md:left-2" type="button" onClick={showPrevious} aria-label={t('lightbox.previous')}>
            <CaretLeft size={22} aria-hidden="true" />
          </button>
          <button className="absolute right-0 grid size-11 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/55 transition-colors duration-200 ease-out hover:border-white/50 hover:bg-white/10 active:scale-[0.97] max-md:right-2 max-md:bottom-4" type="button" onClick={showNext} aria-label={t('lightbox.next')}>
            <CaretRight size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-white/15 pt-4" aria-label={t('lightbox.thumbnails')}>
          {project.gallery.map((item, itemIndex) => (
            <button className="h-16 w-24 shrink-0 cursor-pointer overflow-hidden border-2 transition-colors duration-200 ease-out data-[active=true]:border-[var(--accent)] data-[active=false]:border-transparent md:h-20 md:w-28" type="button" key={item.src} data-active={itemIndex === index} onClick={() => setIndex(itemIndex)} aria-label={t('lightbox.image', { current: itemIndex + 1, total })} aria-current={itemIndex === index ? 'true' : undefined}>
              <img className="h-full w-full object-cover" src={item.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
