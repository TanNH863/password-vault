import React from 'react';
import { LanguageProvider } from './LanguageContext';
import { PasswordProvider } from './PasswordContext';

export const ContextProviders = ({ children }) => {
  return (
    <LanguageProvider>
      <PasswordProvider>
        {children}
      </PasswordProvider>
    </LanguageProvider>
  );
};
