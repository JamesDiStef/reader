"use client";

import { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async () => {
    const newBook = {
      title: "",
      author: "",
    };
    newBook.title = title;
    newBook.author = author;
    await fetch(`/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <div className="text-xl m-3 bg-slate-400 opacity-85 p-5 rounded-md">
        In Beta, we are allowing any user to add books to our database. Thanks
        for helping!
      </div>
      <div className="m-3 w-1/2 md:w-1/3 lg:w-1/6 m-h-1/3">
        <input
          className="text-center text-lg p-2 w-full h-12"
          title="Title"
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="m-3 w-1/2 md:w-1/3 lg:w-1/6 m-h-1/3">
        <input
          className="text-center text-lg p-2 w-full h-12"
          title="Author"
          placeholder="Author"
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded-lg mt-2 mx-auto h-12 px-6 w-48 transition-all duration-300 transform hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 active:scale-95"
        >
          Add book
        </button>
      </div>
    </div>
  );
};

export default Page;
