import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

const LANGUAGE_STORAGE_KEY = 'vivnya-language';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ru: { translation: ru } },
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'en'],
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  });

const syncDocumentLanguage = (language: string) => {
  const resolved = language.startsWith('en') ? 'en' : 'ru';
  const t = i18n.getFixedT(resolved);
  document.documentElement.lang = resolved;
  document.title = t('seo.title');
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', t('seo.description'));
  localStorage.setItem(LANGUAGE_STORAGE_KEY, resolved);
};

syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
i18n.on('languageChanged', syncDocumentLanguage);

export { LANGUAGE_STORAGE_KEY };
export default i18n;
