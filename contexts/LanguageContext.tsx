import i18n from "@/components/Translations";
import React, { createContext, useState } from "react";

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "",
  changeLanguage: () => {},
});

export const LanguageProvider = (children: React.ReactNode) => {
  const [language, setLanguage] = useState(i18n.locale);

  const changeLanguage = (lang: string) => {
    i18n.locale = lang;
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
