import React, { Suspense } from "react";
import SearchBar from "./SearchBar";
import { Book } from "@prisma/client";
import BookFound from "../components/BookFound";
import AddToListButton from "./AddToListButton";

const SearchPageSkeleton = () => {
  const someBooks: Book[] = [
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
    { id: "", title: "...", author: "..." },
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
