import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../platform/locales/en.json';
import nl from '../../platform/locales/nl.json';

const testI18n = i18next.createInstance();

testI18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    nl: {
      translation: nl,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default testI18n;
