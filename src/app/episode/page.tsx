"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { EpisodeResult } from "@/types/api-types";
import { EpisodeFilters } from "@/types/app-types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEpisode } from "@/hooks/useEpisode";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  OptionsIcon,
} from "@/components/common/Icons";

interface FilterDataProps {
  updateFilters: (data: EpisodeFilters) => void;
}

const FilterData = ({ updateFilters }: FilterDataProps) => {
  const handleFilterSubmit = (data: EpisodeFilters) => {
    updateFilters(data);
  };

  const form = useForm<EpisodeFilters>();

  return (
    <>
      <Form {...form}>
        <form
          action=""
          className="flex gap-2 flex-col justify-start md:flex-row"
          onSubmit={form.handleSubmit(handleFilterSubmit)}
        >
          <div>
            <label className="text-md text-gray-300 mb-1">
              Filtrar episodios:
            </label>
            <div className="flex flex-col md:flex-row gap-2 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nombre del episodio"
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
              <Button type="submit" className="">
                Filtrar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

interface OptionsProps {
  page: number;
  maxPage: number;
  prevPage: () => void;
  nextPage: () => void;
}
const Options = ({ page, maxPage, prevPage, nextPage }: OptionsProps) => {
  const {} = useEpisode();
  const router = useRouter();
  const handleCreationClick = () => {
    router.push("/episode/create");
  };

  return (
    <>
      <div>
        <Button variant="default" onClick={() => handleCreationClick()}>
          Nuevo episodio
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => prevPage()}
          disabled={page === 1}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          onClick={() => nextPage()}
          disabled={page === maxPage}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </>
  );
};

interface TableDataProps {
  filteredNewEpisodes: EpisodeResult[];
  episodes: EpisodeResult[];
  page: number;
}

const TableData = ({ filteredNewEpisodes, episodes, page }: TableDataProps) => {
  const [showEditBasicInfo, setShowEditBasicInfo] = useState(false);
  const [showEditStatus, setShowEditStatus] = useState(false);

  const handleEditBasic = (episode: EpisodeResult) => {
    //setCharacter(character);
    setShowEditBasicInfo(true);
  };

  const handleEditStatus = (episode: EpisodeResult) => {
    //setCharacter(character);
    setShowEditStatus(true);
  };
  return (
    <>
      {[...filteredNewEpisodes, ...episodes].length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-secondary">Nombre</TableHead>
              <TableHead className="text-secondary">Episodio</TableHead>
              <TableHead className="text-secondary">Lanzamiento</TableHead>
              <TableHead className="text-secondary"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {page === 1 &&
              filteredNewEpisodes.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.episode}</TableCell>
                  <TableCell>{item.air_date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <OptionsIcon className="hover:text-accent" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditBasic(item)}>
                          <EditIcon /> Editar datos básicos
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditStatus(item)}
                        >
                          <EditIcon /> Editar estado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

            {episodes.map((item) => (
              <TableRow key={item.id}>
                <TableRow key={item.id} className="contents">
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.episode}</TableCell>
                  <TableCell>{item.air_date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <OptionsIcon className="hover:text-accent" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditBasic(item)}>
                          <EditIcon /> Editar datos básicos
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditStatus(item)}
                        >
                          <EditIcon /> Editar estado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No se han encontrado personajes</p>
      )}
    </>
  );
};

export default function EpisodePage() {
  const [episode, setEpisode] = useState<EpisodeResult>();

  const {
    page,
    filteredNewEpisodes,
    episodes,
    maxPage,
    updateFilters,
    prevPage,
    nextPage,
  } = useEpisode();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-10">Episodios</h2>
      <section className="mb-5 w-full">
        <FilterData updateFilters={updateFilters} />
      </section>
      <section className="flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-center md:justify-between w-full my-2">
        <Options
          page={page}
          maxPage={maxPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </section>
      <section className="w-full">
        <TableData
          page={page}
          filteredNewEpisodes={filteredNewEpisodes}
          episodes={episodes}
        />
      </section>
    </div>
  );
}
