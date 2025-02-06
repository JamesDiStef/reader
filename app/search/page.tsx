"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BookFound from "./BookFound";

export interface Book {
  title: string;
  author: string;
}

const page = () => {
  const [searchText, setSearchText] = useState("");
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  const handleSearch = async () => {
    const answer = await fetch(`../api/books/${searchText}`);
    setCurrentBook(await answer.json());
  };

  const handleAddToList = async () => {
    // Constructing the book object to be posted
    const bookToAdd = {
      title: searchText, // Assuming you're using the searchText as the book's title
    };

    try {
      // Posting the book to the /api/books endpoint
      const response = await fetch("/api/mybooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookToAdd),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Book added successfully:", data);
        // Optionally, you can update the UI or notify the user
      } else {
        console.error("Error adding book:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
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
