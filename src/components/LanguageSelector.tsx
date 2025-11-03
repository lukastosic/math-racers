import React from 'react';
import { useLanguage, Locale } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
    const { locale, setLocale } = useLanguage();

    const languages: { code: Locale, label: string, flag: string }[] = [
        { code: 'en', label: 'EN', flag: '🇬🇧' },
        { code: 'nl', label: 'NL', flag: '🇳🇱' },
        { code: 'de', label: 'DE', flag: '🇩🇪' },
        { code: 'sr-Latn', label: 'SR', flag: '🇷🇸' },
        { code: 'sr-Cyrl', label: 'СР', flag: '🇷🇸' },
        { code: 'vi', label: 'VI', flag: '🇻🇳' },
    ];

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-8">
            {languages.map(lang => (
                <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`
                        p-2 md:px-4 md:py-2 flex items-center gap-2 border-4 border-black dark:border-white rounded-xl transition-colors text-lg md:text-xl font-bold
                        ${locale === lang.code ? 'bg-yellow-400 text-slate-800' : 'bg-white/80 dark:bg-slate-800/80 hover:bg-yellow-300 dark:hover:bg-yellow-500'}
                    `}
                >
                    <span className="text-2xl md:text-3xl">{lang.flag}</span>
                    <span>{lang.label}</span>
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;