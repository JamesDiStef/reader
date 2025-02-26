"use client";

import BookFound from "../components/BookFound";
import { useUser } from "../userContext";

const Page = () => {
  const { bookList } = useUser();
  let count = 0;

  // if (!user) redirect("/");

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
      {bookList.map((b) => (
        <BookFound key={count++} book={b} />
      ))}
    </div>
  );
};

export default Page;
