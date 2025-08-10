import {
  deletePasswordInfo,
  getPasswordInfo,
  setupDatabase,
  updatePasswordInfo,
} from "@/db/database";
import { Password } from "@/types/Passwords";
import React, { createContext, useEffect, useState } from "react";

interface PasswordContextType {
  passwords: any[];
  loadPasswordInfo: () => Promise<void>;
  removePasswordInfo: (id: string) => Promise<void>;
  editPasswordInfo: (
    id: string,
    appname: string,
    username: string,
    password: string,
    category: string
  ) => Promise<void>;
  isPasswordVisible: boolean;
  setPasswordVisibility: (isVisible: boolean) => void;
}

export const PasswordContext = createContext<PasswordContextType>({
  passwords: [],
  loadPasswordInfo: async () => {},
  removePasswordInfo: async () => {},
  editPasswordInfo: async () => {},
  isPasswordVisible: false,
  setPasswordVisibility: () => {},
});

export const PasswordProvider = (children: React.ReactNode) => {
  const [passwords, setPasswords] = useState<Array<Password>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setupDatabase();
    loadPasswordInfo();
  }, []);

  const loadPasswordInfo = async () => {
    const passwords = await getPasswordInfo();
    setPasswords(passwords);
  };

  const removePasswordInfo = async (id: string) => {
    await deletePasswordInfo(id);
    loadPasswordInfo();
  };

  const editPasswordInfo = async (
    id: string,
    appname: string,
    username: string,
    password: string,
    category: string
  ) => {
    await updatePasswordInfo(id, appname, username, password, category);
    loadPasswordInfo();
  };

  const setPasswordVisibility = (isVisible: boolean) => {
    setIsVisible(isVisible);
  };

  return (
    <PasswordContext.Provider
      value={{
        passwords,
        loadPasswordInfo,
        removePasswordInfo,
        editPasswordInfo,
        isPasswordVisible: isVisible,
        setPasswordVisibility,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};
