import React from 'react';
import { LanguageProvider } from './LanguageContext';
import { PasswordProvider } from './PasswordContext';
import { UsernameProvider } from './UsernameContext';

export const ContextProviders = ({ children }) => {
  return (
    <LanguageProvider>
      <PasswordProvider>
        <UsernameProvider>
          {children}
        </UsernameProvider>
      </PasswordProvider>
    </LanguageProvider>
  );
};
