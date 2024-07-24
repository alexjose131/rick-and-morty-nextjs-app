"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { EpisodeResult } from "@/types/api-types";
import { CharacterFilters, EpisodeFilters } from "@/types/app-types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FilterData = () => {
  const router = useRouter();
  const [showEditBasicInfo, setShowEditBasicInfo] = useState(false);
  const [showEditStatus, setShowEditStatus] = useState(false);

  const handleFilterSubmit = (data: CharacterFilters) => {
    //updateFilters(data);
  };

  const hadleEditBasic = (episode: EpisodeResult) => {
    //setCharacter(character);
    setShowEditBasicInfo(true);
  };

  const hadleEditStatus = (episode: EpisodeResult) => {
    //setCharacter(character);
    setShowEditStatus(true);
  };

  const handleCreationClick = () => {
    router.push("/character/create");
  };

  const form = useForm<EpisodeFilters>();

  return (
    <section className="mb-5 w-full">
      <label className="text-md text-gray-300 mb-1">Filtrar episodios:</label>
      <Form {...form}>
        <form
          action=""
          className="flex gap-2 flex-col md:flex-row"
          onSubmit={form.handleSubmit(handleFilterSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nombre del personaje"
                    className="placeholder:text-gray-300"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="episode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="episode"
                    placeholder="Episodio"
                    className="placeholder:text-gray-300"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <Button type="submit" className="w-full">
            Filtrar
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default function EpisodePage() {
  /*const {
    error,
    characters,
    filteredNewCharacters,
    page,
    maxPage,
    prevPage,
    nextPage,
    updateFilters,
  } = useCharacter();*/

  const [episode, setEpisode] = useState<EpisodeResult>();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-10">Episodios</h2>
      <section className="mb-5 w-full">
        <FilterData />
      </section>
    </div>
  );
}
