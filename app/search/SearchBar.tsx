"use client";

import React, { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "30px",
        marginTop: "10%",
        color: "black",
      }}
    >
      <input
        style={{
          width: "50%",
          textAlign: "center",
        }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBar;
