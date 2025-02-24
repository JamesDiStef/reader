"use client";

import { useEffect } from "react";
import BookFound from "../components/BookFound";
import { useUser } from "../userContext";

const Page = () => {
  const { bookList } = useUser();
  let count = 0;

  useEffect(() => {}, []);

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {bookList.map((b) => (
        <BookFound key={count++} book={b} />
      ))}
    </div>
  );
};

export default Page;
