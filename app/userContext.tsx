import { createContext, useState, useContext, ReactNode } from "react";

export const UserContext = createContext({
  user: "",
  setUser: (_a: string) => {},
  bookList: [],
  setBookList: (_a: []) => {},
});

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState("");
  const [bookList, setBookList] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, bookList, setBookList }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
