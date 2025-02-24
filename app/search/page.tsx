"use client";

import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BookFound from "../components/BookFound";
import { UserContext } from "../userContext";

export interface Book {
  id: string;
  title: string;
  author: string;
}

const Page = () => {
  const [searchText, setSearchText] = useState("");
  const [currentBooks, setCurrentBooks] = useState<Book[] | null>(null);
  const [allBooks, setAllBooks] = useState<Book[] | null>(null);
  const { user, bookList, setBookList } = useContext(UserContext);

  const handlePageLoad = async () => {
    const answer = await fetch(`../api/books`);
    const theBooks = await answer.json();
    setAllBooks(theBooks);
    setCurrentBooks(theBooks);
  };

  const handleSearch = async () => {
    setCurrentBooks(allBooks!.filter((b) => b.title.includes(searchText)));
  };

  useEffect(() => {
    handlePageLoad();
  }, []);

  const handleAddToList = async (b: Book) => {
    let newBookList: Book[] = [];
    if (currentBooks !== null) newBookList = [...bookList, b];
    setBookList(newBookList);
    await fetch(`/api/users/${user}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookList),
    });
  };

  return (
    <div className="flex flex-col mx-auto w-full">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />
      <div className="grid grid-cols-4 gap-2 w-full">
        {currentBooks?.map((b) => (
          <div key={b.id} className="flex flex-col items-center">
            <BookFound book={b} />
            <button
              onClick={() => handleAddToList(b)}
              className="bg-blue-600 text-white rounded-lg mt-2 mx-auto h-12 px-6 w-48 transition-all duration-300 transform hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 active:scale-95"
            >
              Add to your list
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
