"use client";

import React, { Dispatch, SetStateAction } from "react";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  handleSearch: () => unknown;
}

const SearchBar = ({ searchText, setSearchText, handleSearch }: Props) => {
  // const { user } = useContext(UserContext);

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
          className="bg-blue-600 text-white rounded-lg mt-2 mx-auto h-12 px-6 w-48 transition-all duration-300 transform hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 active:scale-95"
        >
          Search!
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
