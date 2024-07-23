"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    router.push("/character");
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full min-h-screen">
        <form className="flex flex-col gap-2 lg:w-2/5" onSubmit={handleSubmit}>
          <label htmlFor="user" className="text-sm text-gray-300">
            Usuario
          </label>
          <Input type="text" id="user" />

          <label htmlFor="user" className="text-sm text-gray-300">
            Contraseña
          </label>
          <Input type="password" id="user" />

          <Button type="submit">Iniciar sesión</Button>
        </form>
      </section>
    </>
  );
}
