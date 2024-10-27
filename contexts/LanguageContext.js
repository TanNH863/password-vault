import React, { createContext, useState } from "react";
import i18n from "../components/Translations";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale);

  const changeLanguage = (lang) => {
    i18n.locale = lang;
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
