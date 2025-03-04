"use client";

import React, { Suspense, useEffect, useState } from "react";
import BookFound from "../components/BookFound";
import AddToListButton from "./AddToListButton";
import { Book } from "@prisma/client";
import SearchBar from "./SearchBar";

export default function Page() {
  const [inputValue, setInputValue] = useState("");

  const take = 12;
  const [theBooks, setTheBooks] = useState<Book[]>([]);

  const fetchMoreBooks = async () => {
    const answer = await fetch(
      `https://reader-teal-pi.vercel.app/api/books?skip=0&take=${take}&searchString=${inputValue}`
    );

    const books = await answer.json();
    setTheBooks(books);
  };

  const handleInput = (newVal: string) => {
    setInputValue(newVal);
    fetchMoreBooks();
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
        {theBooks?.map((b: Book) => (
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
