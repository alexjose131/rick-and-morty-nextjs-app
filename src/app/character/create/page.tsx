"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { newCharacterSchema } from "@/schemas/newCharacterSchema";
import { useCharacterStore } from "@/store/character-store";
import { CharacterResult, Gender, CharacterStatus } from "@/types/api-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function CreateCharacterPage() {
  const { setNewCharacter } = useCharacterStore();
  const router = useRouter();
  const form = useForm<CharacterResult>({
    resolver: zodResolver(newCharacterSchema),
  });

  const { errors } = form.formState;

  const handleSubmit: SubmitHandler<CharacterResult> = (data) => {
    const newCharacter: CharacterResult = {
      ...data,
      id: Date.now(),
      created: new Date(),
    };
    setNewCharacter(newCharacter);
    router.push("/character");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-10">Nuevo personaje</h2>
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
                    <Input
                      type="text"
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-accent">
                    {errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="name" className="text-gray-300">
                    Estado
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.values(CharacterStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-accent">
                    {errors.status?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="name" className="text-gray-300">
                    Especie
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-accent">
                    {errors.species?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="name" className="text-gray-300">
                    Tipo (Opcional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="type"
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-accent">
                    {errors.type?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="name" className="text-gray-300">
                    Género
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.values(Gender).map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-accent">
                    {errors.gender?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>

            <Button type="submit" className="">
              Crear
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
