import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// We will import the locale files dynamically or statically.
// For a start, let's keep it simple with empty resources and load them, 
// or simpler: just import them.
import en from './locales/en.json';
import is from './locales/is.json';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources: {
            en: {
                translation: en
            },
            is: {
                translation: is
            }
        },
        lng: 'is', // Force default to Icelandic initially if no detection found or just as a strong default
        fallbackLng: 'is',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        // detection options
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        }
    });

export default i18n;
