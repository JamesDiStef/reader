"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import BookFound from "./BookFound";

const page = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col mx-auto ">
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <BookFound searchText={searchText} />
    </div>
  );
};

export default page;
