import React, { Suspense } from "react";
import SearchBar from "./SearchBar";
import { Book } from "@prisma/client";
import BookFound from "../components/BookFound";
import AddToListButton from "./AddToListButton";

const SearchPageSkeleton = () => {
  const someBooks: Book[] = [
    { id: "0", title: "...", author: "..." },
    { id: "1", title: "...", author: "..." },
    { id: "2", title: "...", author: "..." },
    { id: "3", title: "...", author: "..." },
    { id: "4", title: "...", author: "..." },
    { id: "5", title: "...", author: "..." },
    { id: "6", title: "...", author: "..." },
    { id: "7", title: "...", author: "..." },
    { id: "8", title: "...", author: "..." },
    { id: "9", title: "...", author: "..." },
    { id: "10", title: "...", author: "..." },
  ];
  return (
    <div className="flex flex-col mx-auto w-full">
      <Suspense>
        <SearchBar />
      </Suspense>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
        {someBooks?.map((b: Book) => (
          <div key={b.id} className="flex flex-col items-center">
            <BookFound book={b} />
            <AddToListButton book={b} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPageSkeleton;
