"use client";

import { useState } from "react";
import { useUser } from "./userContext";
import { useRouter } from "next/navigation";
import { Book } from "@prisma/client";

const HomeRedirect = () => {
  const [inputValue, setInputValue] = useState("");
  const { setUser, setBookList } = useUser();
  const router = useRouter();

  const handleSubmit = async () => {
    setUser(inputValue);
    router.push("/search");
    const response = await fetch(`/api/users/${inputValue}`);
    let user = await response.json();
    console.log(user.error);
    if (user.error) {
      const newUser = {
        userId: inputValue,
        bookList: [],
      };
      await fetch(`https://reader-teal-pi.vercel.app/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      user = newUser;
    }
    const bookIds = user.bookList;
    const books: Book[] = [];
    for (let i = 0; i < bookIds?.length; i++) {
      const book = await fetch(`/api/booksById/${bookIds[i]}`);
      books.push(await book.json());
    }
    setBookList([...books]);
  };

  return (
    <div className="flex flex-col mt-[25%] sm:mt-[15%] mx-auto w-1/2 h-full justify-center items-center text-black ">
      <div className="text-xl m-3 bg-slate-400 opacity-85 p-5 rounded-md">
        <div className="text-2xl text-center">Login</div>
        Enter a unique id below
      </div>
      <input
        className="flex w-1/2 min-h-[40px] text-center m-3"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="m-3 rounded-lg w-24 h-12 bg-slate-500"
        onClick={handleSubmit}
      >
        Go!
      </button>
    </div>
  );
};

export default HomeRedirect;
