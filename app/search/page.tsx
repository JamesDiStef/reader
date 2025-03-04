import React from "react";
import ClientPage from "./clientpage";

const page = async () => {
  const answer = await fetch(`https://reader-teal-pi.vercel.app/api/books`);
  const data = await answer.json();
  return <ClientPage starterData={data} />;
};

export default page;
