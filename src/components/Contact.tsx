import { useTranslation } from 'react-i18next';
import { LanguageSwitch } from './LanguageSwitch';

export function Contact() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="contact section-shell" id="contact" aria-labelledby="contact-title">
      <p className="section-eyebrow">{t('contact.eyebrow')}</p>
      <h2 className="max-w-[15ch]! whitespace-pre-line text-[clamp(4rem,6vw,6rem)]! leading-none! max-md:max-w-none! max-md:text-[clamp(2.625rem,11.5vw,3rem)]!" id="contact-title">{t('contact.title')}</h2>
      <div className="contact__row">
        <p>
          {t('contact.descriptionBefore')}
          <a className="contact__inline-link" href="https://www.artstation.com/vivnya" target="_blank" rel="noreferrer">ArtStation</a>
          {t('contact.descriptionAfter')}
        </p>
      </div>
      <div className="contact__footer">
        <span>{t('contact.copyright', { year })}</span>
        <span>{t('contact.location')}</span>
        <LanguageSwitch />
      </div>
    </footer>
  );
}
