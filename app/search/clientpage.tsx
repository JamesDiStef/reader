"use client";

import React, { Suspense, useEffect, useState } from "react";
import BookFound from "../components/BookFound";
import AddToListButton from "./AddToListButton";
import { Book } from "@prisma/client";
import SearchBar from "./SearchBar";
import SearchPageSkeleton from "./SearchPageSkeleton";

interface Props {
  starterData: Book[];
}

export default function ClientPage({ starterData }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const take = 12;
  const [theBooks, setTheBooks] = useState<Book[]>(starterData);

  console.log(theBooks);

  const fetchMoreBooks = async (newVal: string) => {
    const answer = await fetch(
      `https://reader-teal-pi.vercel.app/api/books?skip=0&take=${
        theBooks.length + take
      }&searchString=${newVal}`
    );

    const books = await answer.json();
    setTheBooks(books);
  };

  const handleInput = (newVal: string) => {
    setInputValue(newVal);
    fetchMoreBooks(newVal);
  };

  const handleScroll = async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop <= clientHeight) {
      await fetchMoreBooks(inputValue);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  if (!isLoaded) return <SearchPageSkeleton />;
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
    </div>
  );
}
