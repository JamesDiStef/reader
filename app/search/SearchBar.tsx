"use client";

import React, { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  handleSearch: any;
}

const SearchBar = ({ searchText, setSearchText, handleSearch }: Props) => {
  return (
    <div className="flex flex-col w-full justify-center items-center h-[60px] mt-[7%] text-black">
      <input
        className="text-center text-lg p-2 w-80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-gray-200 text-blue-800 rounded-lg mt-2 h-10 px-3 w-40"
        >
          Search!
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
