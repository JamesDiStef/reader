import React, { Suspense } from "react";
import BookFound from "../components/BookFound";
import AddToListButton from "./AddToListButton";
import { Book } from "@prisma/client";
import SearchBar from "./SearchBar";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  // const currentPage = Number(searchParams?.page) || 1;
  const answer = await fetch(`https://reader-teal-pi.vercel.app/api/books`);
  const theBooks = await answer.json();
  const someBooks = theBooks.filter((b: Book) => b.title.includes(query));

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
}
