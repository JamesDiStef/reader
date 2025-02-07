import { createContext, useState, useContext, ReactNode } from "react";

export const UserContext = createContext({
  user: "",
  setUser: (arg: any) => {},
  bookList: [],
  setBookList: (arg: any) => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState("");
  const [bookList, setBookList] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, bookList, setBookList }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
