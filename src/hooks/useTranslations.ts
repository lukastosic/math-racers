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
        // Fetch the JSON file from the public path, which Vite serves at the root.
        const response = await fetch(`./locales/${locale}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        translationsCache[locale] = data; // Store in cache
        if (isMounted) {
          setTranslations(data);
        }
      } catch (error) {
        console.error(`Could not load translations for ${locale}:`, error);
        // Fallback to English if the current locale fails
        if (locale !== 'en') {
            try {
                const fallbackResponse = await fetch(`./locales/en.json`);
                const fallbackData = await fallbackResponse.json();
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
