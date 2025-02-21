"use client";

import React, { useContext, useState } from "react";
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
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const { user, bookList, setBookList } = useContext(UserContext);

  const handleSearch = async () => {
    const answer = await fetch(`../api/books/${searchText}`);
    const theBook = await answer.json();
    console.log(theBook);
    setCurrentBook(theBook);
  };

  const handleAddToList = async () => {
    console.log(currentBook);
    let newBookList = [""];
    if (currentBook) newBookList = [...bookList, currentBook?.id];
    setBookList(newBookList);
    const response = await fetch(`/api/users/${user}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookList),
    });
    console.log(response);
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

export default Page;
