import { createContext, useState, useContext, ReactNode } from "react";

export const UserContext = createContext({
  user: "",
  setUser: (arg: any) => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
