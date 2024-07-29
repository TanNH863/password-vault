import React, { createContext, useState, useEffect } from 'react';
import { setupDatabase, getPasswordInfo, deletePasswordInfo } from '../db/database'

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

  const removePasswordInfo = async (id) => {
    await deletePasswordInfo(id);
    loadPasswordInfo();
  }

  return (
    <PasswordContext.Provider value={{ passwords, loadPasswordInfo, removePasswordInfo }}>
      {children}
    </PasswordContext.Provider>
  );
};
