import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

// Create default context value
const defaultContextValue: LanguageContextType = {
  language: 'cs',
  setLanguage: () => {},
  t: (key: TranslationKey) => translations['cs'][key] || key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('cs');

  const t = React.useCallback((key: TranslationKey): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = React.useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};