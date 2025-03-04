"use client";

import React from "react";

interface Props {
  inputValue: string;
  handleInput: (newVal: string) => void;
}

const SearchBar = ({ inputValue, handleInput }: Props) => {
  return (
    <div className="flex flex-col w-full justify-center items-center h-[60px] mt-[7%] text-black">
      <input
        className="text-center text-lg p-2 w-80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
        value={inputValue}
        onChange={(e) => handleInput(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBar;
