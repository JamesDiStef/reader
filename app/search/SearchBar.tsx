"use client";

import React, { Dispatch, SetStateAction } from "react";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ searchText, setSearchText }: Props) => {
  return (
    <div className="flex w-full justify-center h-[30px] mt-[10%] text-black">
      <input
        className="w-[50%] text-center"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBar;
