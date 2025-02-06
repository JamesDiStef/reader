import Link from "next/link";
import React from "react";

const NavBar = () => {
  const links = [
    { title: "Home", href: "/search", classes: "mr-5 hover:text-blue-500" },
    {
      title: "My Books",
      href: "/mybooks",
      classes: "mr-5 hover:text-blue-500",
    },
    {
      title: "Admin Page",
      href: "/users",
      classes: "mr-5 hover:text-blue-500",
    },
  ];

  return (
    <div className="flex bg-slate-500 p-3">
      {links.map((l) => (
        <Link href={l.href} className={l.classes}>
          {l.title}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
