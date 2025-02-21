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
  bookList: string[];
  setBookList: Dispatch<SetStateAction<never[]>>;
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
  const [bookList, setBookList] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, bookList, setBookList }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
