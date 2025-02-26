"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("query", e.target.value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-[60px] mt-[7%] text-black">
      <input
        className="text-center text-lg p-2 w-80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleTyping(e)}
      ></input>
      <div className="flex justify-center">
        <button className="bg-blue-600 text-white rounded-lg mt-2 mx-auto h-12 px-6 w-48 transition-all duration-300 transform hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 active:scale-95">
          Search!
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
