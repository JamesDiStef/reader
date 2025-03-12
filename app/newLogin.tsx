"use client";

import React, { useActionState } from "react";
import { signUp } from "./actions/auth";

const Newlogin = () => {
  const [state, action, pending] = useActionState(signUp, undefined);

  return (
    <div className="flex justify-center mt-[20%] min-h-80">
      <form
        action={action}
        className="flex flex-col min-h-80 items-stretch gap-9 text-black"
      >
        <div className="flex flex-col">
          <input
            className="h-12 p-2"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col">
          <input
            className="h-12 p-2 w-64"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          ></input>
        </div>
        <button className="rounded-xl h-12 bg-blue-500">Login</button>
      </form>
    </div>
  );
};

export default Newlogin;
