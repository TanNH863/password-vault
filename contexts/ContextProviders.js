import React from 'react';
import { LanguageProvider } from './LanguageContext';
import { PasswordProvider } from './PasswordContext';
import { UsernameProvider } from './UsernameContext';
import { NoteProvider } from './NoteContext';
import { DocumentsProvider } from './DocumentsContext';

export const ContextProviders = ({ children }) => {
  return (
    <LanguageProvider>
      <PasswordProvider>
        <UsernameProvider>
          <NoteProvider>
            <DocumentsProvider>
              {children}
            </DocumentsProvider>
          </NoteProvider>
        </UsernameProvider>
      </PasswordProvider>
    </LanguageProvider>
  );
};
