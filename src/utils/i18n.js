// i18n.js (or similar file)
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
      fr: {
        translation: frTranslations,
      },
    },
    lng: 'es', // default language
    fallbackLng: 'es', // fallback language in case of missing translations
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });