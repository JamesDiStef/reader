"use client";

import BookFound from "../components/BookFound";
import { useUser } from "../userContext";

const page = () => {
  const { user, bookList } = useUser();
  console.log(user);

  return (
    <div>
      {bookList.map((b) => (
        <BookFound key={b} book={b} />
      ))}
    </div>
  );
};

export default page;
