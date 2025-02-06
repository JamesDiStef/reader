import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex bg-slate-500 p-3">
      <Link href="/search" className="mr-5">
        Home
      </Link>
      <Link href="/users" className="mr-5">
        User Page
      </Link>
      <Link href="/admin" className="mr-5">
        Admin Page
      </Link>
    </div>
  );
};

export default NavBar;
