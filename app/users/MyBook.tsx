"use client";

import { Book } from "@prisma/client";
import React, { useState } from "react";
import { useUser } from "../userContext";
import { useRouter } from "next/navigation";

interface Props {
  book: Book | null;
}

const MyBook = ({ book }: Props) => {
  const [isThere, setIsThere] = useState(true);
  const { user, bookList, setBookList } = useUser();
  const router = useRouter();

  function edit() {
    console.log("now route to new page");
    router.push(`/users/${book?.title}`);
  }

  const handleRemove = async () => {
    const newBookList = bookList.filter((b) => b.id !== book!.id);
    setBookList(newBookList);
    await fetch(`/api/users/${user}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookList),
    });
    setIsThere(false);
  };

  if (!isThere) return false;
  return (
    <div className="flex justify-center mt-24 h-full min-h-36 lg:h-[75%]">
      <div className="flex flex-col items-center justify-center bg-slate-300 shadow-lg rounded-lg  w-80 border-l-[22px] border-black">
        <div className="flex rounded-sm border-2 border-black bg-yellow-400 w-full justify-between p-2">
          <button onClick={() => edit()}>Edit</button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleRemove}
            className="rounded-md border-2 border-black bg-slate-600 text-white p-2 mb-2"
          >
            Remove Book
          </button>
        </div>

        <div className="flex flex-col items-center bg-blue-500 text-white  p-4 rounded-lg shadow-md mb-4">
          <h1 className="text-3xl font-bold min-w-8 text-center">
            {book?.title}
          </h1>
        </div>

        <div className="text-center p-4 bg-gray-100 min-w-8 rounded-lg shadow-inner">
          <p className="italic text-lg text-blue-400">{book?.author}</p>
        </div>
      </div>
    </div>
  );
};

export default MyBook;
