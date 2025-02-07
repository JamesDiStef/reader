"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

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
    </div>
  );
};

export default NavBar;
