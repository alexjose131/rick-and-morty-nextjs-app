"use client";

import { newEpisodeSchema } from "@/schemas/newEpisodeSchema";
import { EpisodeResult } from "@/types/api-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEpisode } from "@/hooks/useEpisode";

export default function CreateEpisodePage() {
  const { createEpisode } = useEpisode();
  const router = useRouter();
  const form = useForm<EpisodeResult>({
    resolver: zodResolver(newEpisodeSchema),
  });

  const { errors } = form.formState;

  const handleSubmit: SubmitHandler<EpisodeResult> = (data) => {
    createEpisode(data);
    goToEpisodePage();
  };

  const goToEpisodePage = () => {
    router.push("/episode");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-10">Nuevo episodio</h2>
      <section className="flex justify-center items-center w-2/5">
        <Form {...form}>
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="name" className="text-gray-300">
                    Nombre
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage className="text-accent">
                    {errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="air_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="name" className="text-gray-300">
                    Fecha de lanzamiento
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage className="text-accent">
                    {errors.air_date?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="episode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="name" className="text-gray-300">
                    Episodio
                  </FormLabel>
                  <FormControl>
                    <Input type="type" {...field} />
                  </FormControl>
                  <FormMessage className="text-accent">
                    {errors.episode?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>

            <Button type="submit">Crear</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Volver
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
