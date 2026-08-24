import { ArrowDown } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { assetPath } from '../content/assetPath';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true">
        <img src={assetPath('/og-vivnya.png')} alt="" />
      </div>
      <div className="hero__content">
        <div className="flex flex-col gap-2">
          <h1 className="hero__title" id="hero-title">VIVNYA</h1>
          <p className="hero__eyebrow">{t('hero.name')}</p>
          <p className="hero__role">{t('hero.role')}</p>
          <p className="hero__location">{t('hero.location')}</p>
        </div>
      </div>
      <a className="hero__scroll" href="#work" aria-label={t('nav.work')}>
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
