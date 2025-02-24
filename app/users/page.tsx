"use client";

import BookFound from "../components/BookFound";
import { useUser } from "../userContext";

const Page = () => {
  const { bookList } = useUser();
  let count = 0;

  return (
    <div>
      {bookList.map((b) => (
        <BookFound key={count++} book={b} />
      ))}
    </div>
  );
};

export default Page;
