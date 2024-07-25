"use client";

import { useEffect } from "react";
import { permanentRedirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    permanentRedirect("/auth/login");
  }, []);
  return <main></main>;
}
