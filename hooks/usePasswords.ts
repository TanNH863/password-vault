import {
  deletePasswordInfo,
  getPasswordInfo,
  insertPasswordInfo,
  updatePasswordInfo,
} from "@/db/database";
import { Password } from "@/types/Passwords";
import { useEffect, useState } from "react";

export function usePasswords() {
  const [passwords, setPasswords] = useState<Array<Password>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadPasswordInfo();
  }, []);

  const loadPasswordInfo = async () => {
    const passwords = await getPasswordInfo();
    setPasswords(passwords);
  };

  const addPasswordInfo = async (password: Password) => {
    await insertPasswordInfo(password);
    loadPasswordInfo();
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

  const setVisibility = (isVisible: boolean) => {
    setIsVisible(isVisible);
  };

  return {
    passwords,
    addPasswordInfo,
    editPasswordInfo,
    removePasswordInfo,
    setVisibility,
    reload: loadPasswordInfo,
  };
}
