import { Book } from "@prisma/client";
import React from "react";

interface Props {
  book: Book | null;
}

const BookFound = ({ book }: Props) => {
  return (
    <div className="flex justify-center mt-24 h-full min-h-36 lg:h-[75%]">
      <div className="flex flex-col items-center justify-center bg-slate-300 shadow-lg rounded-lg p-8 w-80 border-l-[22px] border-black">
        <div className="flex flex-col items-center bg-blue-500 text-white  p-4 rounded-lg shadow-md mb-4">
          <h1 className="text-3xl font-bold min-w-8 text-center">
            {book?.title}
          </h1>
        </div>

        <div className="text-center p-4 bg-gray-100 min-w-8 rounded-lg shadow-inner">
          <p className="italic text-lg text-blue-400">{book?.author}</p>
        </div>
      </div>
    </div>
  );
};

export default BookFound;
