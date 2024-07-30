import React, { createContext, useState, useEffect } from 'react';
import { setupDatabase, getPasswordInfo, deletePasswordInfo, updatePasswordInfo } from '../db/database'

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

  const editPasswordInfo = async (passwordInfo) => {
    await updatePasswordInfo(passwordInfo);
    loadPasswordInfo();
  }

  return (
    <PasswordContext.Provider value={{ passwords, loadPasswordInfo, removePasswordInfo, editPasswordInfo }}>
      {children}
    </PasswordContext.Provider>
  );
};
