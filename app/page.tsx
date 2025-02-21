"use client";

import { useState } from "react";
import { useUser } from "./userContext";
import { useRouter } from "next/navigation";

const HomeRedirect = () => {
  const [inputValue, setInputValue] = useState("");
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async () => {
    setUser(inputValue);
    const user = await fetch(`/api/users/${inputValue}`);
    const user2 = await user.json();
    const books = user2.bookList;
    // setBookList([books]);
    console.log(books);
    router.push("/search");
  };

  return (
    <div className="flex flex-col mt-[25%] sm:mt-[15%] mx-auto w-1/2 h-full justify-center items-center text-black ">
      <div className="text-xl m-3 bg-slate-400 opacity-85 p-5 rounded-md">
        <div className="text-2xl text-center">Login</div>
        If you have a unique user id, enter it below! If not, make one up - we
        will let you know if it's already taken
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
      <div className="mt-3">
        <p>Current User: {user}</p>
      </div>
    </div>
  );
};

export default HomeRedirect;
