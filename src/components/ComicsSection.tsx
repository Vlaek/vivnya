import { ArrowUpRight, CornersOut } from '@phosphor-icons/react';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { comic } from '../content/comics';
import { ProjectLightbox } from './ProjectLightbox';

export function ComicsSection() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  }, []);

  return (
    <section
      className="section-shell border-t border-[var(--line)] py-[clamp(96px,8vw,120px)]"
      id="comics"
      aria-labelledby="comics-title"
    >
      <p className="section-eyebrow">{t('comics.eyebrow')}</p>
      <h2
        id="comics-title"
        className="m-0 font-['Oswald_Variable'] text-[clamp(64px,8.5vw,144px)] leading-[0.94] font-[560] tracking-[-0.045em] uppercase"
      >
        {t('comics.title')}
      </h2>

      <article className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)] lg:items-end lg:gap-12">
        <button
          ref={openerRef}
          className="group relative block w-full cursor-pointer overflow-hidden bg-[var(--surface)] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={t('work.viewGallery', { title: comic.title })}
        >
          <img
            className="aspect-video w-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.015]"
            src={comic.image}
            alt={t(`${comic.translationKey}.alt`)}
          />
          <span className="absolute inset-0 bg-black/0 transition-colors duration-300 ease-out group-hover:bg-black/15 motion-reduce:transition-none" />
          <span className="absolute right-4 bottom-4 grid size-12 place-items-center rounded-full border border-white/30 bg-black/65 text-white backdrop-blur-sm transition-transform duration-200 ease-out group-hover:scale-105 md:right-6 md:bottom-6 md:size-14">
            <CornersOut size={22} aria-hidden="true" />
          </span>
        </button>

        <div className="max-w-[36rem] lg:pb-2">
          <p className="m-0 text-xs font-semibold tracking-[0.12em] text-[var(--accent)] uppercase md:text-sm">
            {t(`${comic.translationKey}.category`)}
          </p>
          <h3
            className="mt-4 mb-0 font-['Oswald_Variable'] text-[clamp(30px,8vw,48px)] leading-[1.04] font-[560] tracking-[-0.03em] uppercase lg:text-[clamp(36px,3.2vw,52px)]"
            aria-label={comic.title}
          >
            <span className="block whitespace-nowrap">The Stone of Eternity</span>
            <span className="block whitespace-nowrap">Game comic</span>
            <span className="block whitespace-nowrap">Part 1</span>
          </h3>
          <p className="mt-5 mb-0 max-w-[58ch] text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
            {t(`${comic.translationKey}.description`)}
          </p>
          <a
            className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-[var(--ink)] text-base font-semibold text-[var(--ink)] transition-colors duration-200 ease-out hover:border-[var(--accent)] hover:text-[var(--accent)] active:opacity-75"
            href={comic.href}
            target="_blank"
            rel="noreferrer"
            aria-label={t('work.open', { title: comic.title })}
          >
            <span>ArtStation</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
      </article>

      {isOpen ? <ProjectLightbox project={comic} onClose={closeLightbox} /> : null}
    </section>
  );
}
