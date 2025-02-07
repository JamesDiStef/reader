"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "../userContext";

const NavBar = () => {
  const currentPath = usePathname();
  const { user, setUser, bookList } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    setUser("");
    router.push("/");
  };

  const links = [
    { title: "Home", href: "/search" },
    {
      title: "My Books",
      href: "/users",
    },
    {
      title: "Admin Page",
      href: "/admin",
    },
  ];

  return (
    <div>
      {user && (
        <div className="flex bg-slate-500 p-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mr-5 hover:text-black ${
                currentPath === l.href ? "text-black" : ""
              }`}
            >
              {l.title}
            </Link>
          ))}
          <div className="flex-grow"></div>
          <div className="mr-5">
            {user}
            {bookList.length}
          </div>
          {user && (
            <button className="mr-5" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
