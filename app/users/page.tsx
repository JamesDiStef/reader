"use client";

import BookFound from "../components/BookFound";
import { useUser } from "../userContext";

const Page = () => {
  const { user, bookList } = useUser();

  return (
    <div>
      {bookList.map((b) => (
        <BookFound key={b.id} book={b} />
      ))}
    </div>
  );
};

export default Page;
