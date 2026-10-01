import { ArrowUpRight } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export function AnimationsSection() {
  const { t } = useTranslation();

  return (
    <section
      className="section-shell border-t border-[var(--line)] py-[clamp(96px,8vw,120px)]"
      id="animations"
      aria-labelledby="animations-title"
    >
      <p className="section-eyebrow">{t("animations.eyebrow")}</p>
      <h2
        id="animations-title"
        className="m-0 font-['Oswald_Variable'] text-[clamp(56px,8.5vw,144px)] leading-[1.04] font-[560] tracking-[-0.035em] uppercase"
      >
        {t("animations.title")}
      </h2>

      <article className="mt-10 grid grid-cols-1 gap-8 md:mt-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)] lg:gap-12">
        <iframe
          className="aspect-video w-full self-start border-0 bg-[var(--surface)]"
          src="https://www.youtube-nocookie.com/embed/RRoTocAVguE?rel=0"
          title="Kapishche — Animatic"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className="max-w-[36rem] lg:flex lg:flex-col">
          <p className="m-0 text-xs font-semibold tracking-[0.12em] text-[var(--accent)] uppercase md:text-sm">
            {t("animations.category")}
          </p>
          <h3 className="mt-4 mb-0 font-['Oswald_Variable'] text-[clamp(34px,5vw,52px)] leading-[1.04] font-[560] tracking-[-0.03em] uppercase">
            Kapishche — Animatic
          </h3>
          <p className="mt-5 mb-0 max-w-[58ch] text-base leading-[1.55] text-[var(--muted)] md:text-lg">
            {t("animations.description")}
          </p>
          <a
            className="comic-action-link mt-8 inline-flex min-h-11 items-center gap-3 self-start border-b border-[var(--ink)] text-base font-semibold text-[var(--ink)] transition-colors duration-200 ease-out active:opacity-75 lg:mt-auto"
            href="https://www.artstation.com/artwork/o0JlVw"
            target="_blank"
            rel="noreferrer"
            aria-label={t("work.open", { title: "Kapishche — Animatic" })}
          >
            <span>ArtStation</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
      </article>
    </section>
  );
}
