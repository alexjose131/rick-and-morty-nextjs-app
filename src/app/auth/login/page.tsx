"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialsSchema } from "@/schemas/credentialsSchema";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsInputs>({
    resolver: zodResolver(credentialsSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CredentialsInputs> = (data) => {
    // to do -- Handle login and session management
    router.push("/character");
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full min-h-screen">
        <form
          className="flex flex-col gap-3 lg:w-2/5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="user" className="text-sm text-gray-300">
            Usuario
          </label>
          <Input type="text" id="user" {...register("user")} />
          <p className="text-sm text-gray-300 text-accent">
            {errors.user?.message}
          </p>

          <label htmlFor="user" className="text-sm text-gray-300">
            Contraseña
          </label>
          <Input type="password" id="user" {...register("password")} />
          <p className="text-sm text-gray-300 text-accent">
            {errors.password?.message}
          </p>

          <Button type="submit" className="mt-5">
            Iniciar sesión
          </Button>
        </form>
      </section>
    </>
  );
}
