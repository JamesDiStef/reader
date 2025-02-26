"use client";

import { Book } from "@prisma/client";
import BookFound from "../components/BookFound";
import { useUser } from "../userContext";
import { useEffect } from "react";

const Page = () => {
  const { user, bookList, setBookList } = useUser();
  let count = 0;

  // TODO: make this server component
  const fetchStuff = async () => {
    const books: Book[] = [];
    const user2 = await fetch(`/api/users/${user}`);
    const user3 = await user2.json();
    const bookIds = user3.bookList;
    for (let i = 0; i < bookIds?.length; i++) {
      const book = await fetch(`/api/booksById/${bookIds[i]}`);
      books.push(await book.json());
    }
    setBookList([...books]);
  };

  useEffect(() => {
    fetchStuff();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
      {bookList.map((b) => (
        <BookFound key={count++} book={b} />
      ))}
    </div>
  );
};

export default Page;
