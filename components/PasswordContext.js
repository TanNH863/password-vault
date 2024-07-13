import React, { createContext, useState, useEffect } from 'react';
import { setupDatabase, getPasswordInfo } from '../db/database'

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    setupDatabase();
    loadPasswordInfo();
  }, []);

  const loadPasswordInfo = async () => {
    const passwords = await getPasswordInfo();
    setPasswords(passwords);
  };

  return (
    <PasswordContext.Provider value={{ passwords, loadPasswordInfo }}>
      {children}
    </PasswordContext.Provider>
  );
};
