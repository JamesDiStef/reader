"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomeRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/search");
  }, [router]);

  return null;
};

export default HomeRedirect;
