"use client";

import { useEffect } from "react";
import { permanentRedirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    // Redireccionar a la página de login
    permanentRedirect("/auth/login");
  }, []);
  return (
    <main className="">
      <p>Home works</p>
    </main>
  );
}
