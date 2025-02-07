"use client";

import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import BookFound from "./BookFound";
import { UserContext } from "../userContext";

export interface Book {
  id: string;
  title: string;
  author: string;
}

const page = () => {
  const [searchText, setSearchText] = useState("");
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const { user } = useContext(UserContext);

  const handleSearch = async () => {
    const answer = await fetch(`../api/books/${searchText}`);
    const theBook = await answer.json();
    console.log(theBook);
    setCurrentBook(theBook);
  };

  const handleAddToList = async () => {
    console.log(currentBook);
    const body = {
      user: user,
      newId: currentBook?.id,
    };
    const response = await fetch("/api/mybooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <div className="flex flex-col mx-auto ">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />
      {currentBook !== null && <BookFound book={currentBook} />}
      {currentBook !== null && (
        <div className="flex justify-center">
          <button
            onClick={handleAddToList}
            className="bg-gray-200 text-blue-800 rounded-lg mt-2 h-10 px-3 w-40"
          >
            Add to your list
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
