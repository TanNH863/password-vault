import React from 'react';
import { LanguageProvider } from './LanguageContext';
import { PasswordProvider } from './PasswordContext';
import { UsernameProvider } from './UsernameContext';
import { NoteProvider } from './NoteContext';

export const ContextProviders = ({ children }) => {
  return (
    <LanguageProvider>
      <PasswordProvider>
        <UsernameProvider>
          <NoteProvider>
              {children}
          </NoteProvider>
        </UsernameProvider>
      </PasswordProvider>
    </LanguageProvider>
  );
};
