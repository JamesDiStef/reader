"use client";

import { Book } from "@prisma/client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface UserContextType {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
  bookList: Book[];
  setBookList: Dispatch<SetStateAction<Book[]>>;
}

export const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => {},
  bookList: [],
  setBookList: () => {},
});

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState("");
  const [bookList, setBookList] = useState<Book[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser, bookList, setBookList }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
