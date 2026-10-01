import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CornersOut,
} from "@phosphor-icons/react";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { comics } from "../content/comics";
import { ProjectLightbox } from "./ProjectLightbox";

export function ComicsSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const comic = comics[activeIndex];

  const selectPart = (index: number) => {
    setActiveIndex(index);
    setIsOpen(false);
  };

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
      <p className="section-eyebrow">{t("comics.eyebrow")}</p>
      <h2
        id="comics-title"
        className="m-0 font-['Oswald_Variable'] text-[clamp(64px,8.5vw,144px)] leading-[0.94] font-[560] tracking-[-0.045em] uppercase"
      >
        {t("comics.title")}
      </h2>

      <div className="mt-10 md:mt-14">
        <h3 className="m-0 font-['Oswald_Variable'] text-[clamp(34px,5vw,68px)] leading-none font-[560] tracking-[-0.035em] uppercase">
          {t("comics.seriesTitle")}
        </h3>
        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={t("comics.partsLabel")}
        >
          {comics.map((item, index) => (
            <button
              className="comic-part-tab min-h-11 shrink-0 cursor-pointer border px-5 text-sm font-semibold data-[active=true]:border-[var(--accent)] data-[active=true]:bg-[var(--accent)] data-[active=true]:text-[#170b10] data-[active=false]:border-[var(--line)] data-[active=false]:text-[var(--muted)] active:scale-[0.97]"
              type="button"
              role="tab"
              key={item.id}
              id={`${item.id}-tab`}
              aria-controls={`${item.id}-panel`}
              aria-selected={index === activeIndex}
              data-active={index === activeIndex}
              onClick={() => selectPart(index)}
            >
              {t(`${item.translationKey}.tab`)}
            </button>
          ))}
        </div>
      </div>

      <article
        className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)] lg:items-stretch lg:gap-12"
        id={`${comic.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${comic.id}-tab`}
      >
        <button
          ref={openerRef}
          className="group relative block w-full cursor-pointer self-start overflow-hidden bg-[var(--surface)] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={t("work.viewGallery", { title: comic.title })}
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

        <div className="max-w-[36rem] lg:flex lg:h-full lg:flex-col">
          <p className="m-0 text-xs font-semibold tracking-[0.12em] text-[var(--accent)] uppercase md:text-sm">
            {t(`${comic.translationKey}.category`)}
          </p>
          <h4
            className="mt-4 mb-0 font-['Oswald_Variable'] text-[clamp(34px,8vw,52px)] leading-[1.04] font-[560] tracking-[-0.03em] uppercase"
            aria-label={comic.title}
          >
            {t(`${comic.translationKey}.title`)}
          </h4>
          <p className="mt-5 mb-0 max-w-[58ch] text-base leading-7 text-[var(--muted)] md:text-lg md:leading-8">
            {t(`${comic.translationKey}.description`)}
          </p>
          <a
            className="comic-action-link mt-8 inline-flex min-h-11 items-center gap-3 self-start border-b border-[var(--ink)] text-base font-semibold text-[var(--ink)] transition-colors duration-200 ease-out active:opacity-75 lg:mt-auto"
            href={comic.href}
            target="_blank"
            rel="noreferrer"
            aria-label={t("work.open", { title: comic.title })}
          >
            <span>ArtStation</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
      </article>

      <nav
        className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-5"
        aria-label={t("comics.partsNavigation")}
      >
        <button
          className="comic-part-navigation inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-[var(--ink)] transition-colors duration-200 disabled:cursor-default disabled:opacity-30"
          type="button"
          disabled={activeIndex === 0}
          onClick={() => selectPart(activeIndex - 1)}
          aria-label={t("comics.previousPart")}
        >
          <ArrowLeft size={18} aria-hidden="true" />
          <span className="max-sm:hidden">{t("comics.previousPart")}</span>
        </button>
        <p className="m-0 text-sm text-[var(--muted)]">
          {t("comics.partCounter", {
            current: activeIndex + 1,
            total: comics.length,
          })}
        </p>
        <button
          className="comic-part-navigation inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-[var(--ink)] transition-colors duration-200 disabled:cursor-default disabled:opacity-30"
          type="button"
          disabled={activeIndex === comics.length - 1}
          onClick={() => selectPart(activeIndex + 1)}
          aria-label={t("comics.nextPart")}
        >
          <span className="max-sm:hidden">{t("comics.nextPart")}</span>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </nav>

      {isOpen ? (
        <ProjectLightbox project={comic} onClose={closeLightbox} />
      ) : null}
    </section>
  );
}
