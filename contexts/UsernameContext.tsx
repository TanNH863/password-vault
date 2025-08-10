import React, { createContext, useState } from "react";

interface UsernameContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const UsernameContext = createContext<UsernameContextType>({
  username: "",
  setUsername: () => {},
});

export const UsernameProvider = (children: React.ReactNode) => {
  const [username, setUsername] = useState("");

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};
