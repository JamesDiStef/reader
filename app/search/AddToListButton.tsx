"use client";

import { Book } from "@prisma/client";
import React from "react";
import { useUser } from "../userContext";

interface Props {
  book: Book;
}

const AddToListButton = ({ book }: Props) => {
  const { user, bookList, setBookList } = useUser();

  const handleAddToList = async () => {
    let newBookList: Book[] = [];
    newBookList = [...bookList, book];
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
    <button
      onClick={handleAddToList}
      className="bg-blue-600 text-white rounded-lg mt-2 mx-auto h-12 px-6 w-48 transition-all duration-300 transform hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 active:scale-95"
    >
      Add to your list
    </button>
  );
};

export default AddToListButton;
