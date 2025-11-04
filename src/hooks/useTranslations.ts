import { useState, useEffect } from 'react';
import { useLanguage, Locale } from '../contexts/LanguageContext';

type Translations = { [key: string]: any };

// A simple in-memory cache to avoid re-fetching
const translationsCache: Partial<Record<Locale, Translations>> = {};

export const useTranslations = () => {
  const { locale } = useLanguage();
  // Initialize state with cached translations if available
  const [translations, setTranslations] = useState<Translations | null>(
    translationsCache[locale] || null
  );

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const fetchTranslations = async () => {
      // If translations are already in cache, use them
      if (translationsCache[locale]) {
        if (isMounted) {
          setTranslations(translationsCache[locale]!);
        }
        return;
      }

      try {
        // Load JSON via dynamic import from src/locales. This avoids copying files
        // to public/ and works both in dev and in the build output.
        const module = await import(`../locales/${locale}.json`);
        const data = module.default || module;
        translationsCache[locale] = data; // Store in cache
        if (isMounted) {
          setTranslations(data);
        }
      } catch (error) {
        console.error(`Could not load translations for ${locale}:`, error);
        // Fallback to English if the current locale fails
        if (locale !== 'en') {
          try {
            const fallbackModule = await import(`../locales/en.json`);
            const fallbackData = fallbackModule.default || fallbackModule;
            translationsCache['en'] = fallbackData; // Cache fallback
            if (isMounted) {
              setTranslations(fallbackData);
            }
          } catch (fallbackError) {
            console.error(`Could not load fallback English translations:`, fallbackError);
            if (isMounted) {
              setTranslations({}); // Set empty object on total failure
            }
          }
        } else if (isMounted) {
          setTranslations({});
        }
      }
    };

    fetchTranslations();

    // Cleanup function to set the flag on unmount
    return () => {
      isMounted = false;
    };
  }, [locale]);

  const t = (key: string): any => {
    // If translations are not loaded yet, return the key itself as a fallback.
    // This prevents the UI from crashing and shows a placeholder.
    if (!translations) {
      return key;
    }
    return translations[key] || key;
  };

  return { t, locale };
};
