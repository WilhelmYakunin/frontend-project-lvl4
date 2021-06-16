import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lng/en.js';
import ru from './lng/ru.js';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      ru,
    },
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
