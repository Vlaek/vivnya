import { useTranslation } from 'react-i18next';

const languages = ['ru', 'en'] as const;

export function LanguageSwitch() {
  const { i18n, t } = useTranslation();
  const activeLanguage = (i18n.resolvedLanguage ?? i18n.language).startsWith('en') ? 'en' : 'ru';

  return (
    <div className="language-switch" role="group" aria-label={t('language.label')}>
      {languages.map((language) => (
        <button
          className="language-switch__button"
          data-active={activeLanguage === language}
          key={language}
          type="button"
          aria-pressed={activeLanguage === language}
          aria-label={t(`language.${language}`)}
          onClick={() => void i18n.changeLanguage(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
