"use client";

import React, { Suspense, useEffect, useState } from "react";
import BookFound from "../components/BookFound";
import AddToListButton from "./AddToListButton";
import { Book } from "@prisma/client";
import SearchBar from "./SearchBar";

export default function Page() {
  const [inputValue, setInputValue] = useState("");

  const [skip, setSkip] = useState(0);
  const take = 12;
  const [theBooks, setTheBooks] = useState<Book[]>([]);
  const [someBooks, setSomeBooks] = useState(
    theBooks.filter((b: Book) => b.title.includes(inputValue))
  );

  const fetchMoreBooks = async () => {
    setSkip(skip + theBooks.length);
    const answer = await fetch(
      // `https://reader-teal-pi.vercel.app/api/books?skip=${skip}&take=${take}`
      `http://localhost:3000/api/books?skip=${
        skip + theBooks.length
      }&take=${take}`
    );

    const books = await answer.json();
    setTheBooks([...theBooks, ...books]);
    setSomeBooks(
      [...theBooks, ...books].filter((b: Book) => b.title.includes(inputValue))
    );
  };

  const handleInput = (newVal: string) => {
    setInputValue(newVal);
    setSomeBooks(theBooks.filter((b: Book) => b.title.includes(newVal)));
  };

  useEffect(() => {
    fetchMoreBooks();
  }, []);

  return (
    <div className="flex flex-col mx-auto w-full">
      <Suspense>
        <SearchBar inputValue={inputValue} handleInput={handleInput} />
      </Suspense>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
        {someBooks?.map((b: Book) => (
          <div key={b.id} className="flex flex-col items-center">
            <BookFound book={b} />
            <AddToListButton book={b} />
          </div>
        ))}
      </div>
      <button
        className="rounded-lg p-3 bg-red-700"
        onClick={() => fetchMoreBooks()}
      >
        Fetch More Books
      </button>
    </div>
  );
}
