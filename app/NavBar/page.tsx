"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "../userContext";

const NavBar = () => {
  const currentPath = usePathname();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    setUser("");
    router.push("/");
  };

  const links = [
    { title: "Home", href: "/search" },
    {
      title: "My Books",
      href: `/users?user=${user}`,
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
          <div className="mr-5">{user}</div>
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
