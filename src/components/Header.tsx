import { useTranslation } from 'react-i18next';
import { LanguageSwitch } from './LanguageSwitch';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label={t('a11y.navigation')}>
        <a href="#work">{t('nav.work')}</a>
        <a href="#about">{t('nav.about')}</a>
        <a href="#contact">{t('nav.contact')}</a>
      </nav>
      <LanguageSwitch />
    </header>
  );
}
