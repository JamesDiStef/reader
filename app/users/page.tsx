"use client";

import { useUser } from "../userContext";

const page = () => {
  const { user, setUser } = useUser();

  return <div>{user}</div>;
};

export default page;
