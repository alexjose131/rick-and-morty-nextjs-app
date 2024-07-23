"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useForm } from "react-hook-form";
import { useCharacter } from "@/hooks/useCharacter";
import { CharacterFilters } from "@/types/app-types";
import { Gender } from "@/types/api-types";

export default function CharacterPage() {
  const {
    error,
    characters,
    page,
    maxPage,
    prevPage,
    nextPage,
    updateFilters,
  } = useCharacter();
  const { register, handleSubmit } = useForm<CharacterFilters>();

  const handleFilterSubmit = (data: CharacterFilters) => {
    updateFilters(data);
  };

  return (
    <>
      <h2 className="text-start text-3xl mb-10 md:mb-20">Personajes</h2>
      <section className="mb-5 w-full">
        <p className="text-sm text-gray-300">Filtrar personajes:</p>
        <form
          action=""
          className="flex gap-2 flex-col md:flex-row"
          onSubmit={handleSubmit(handleFilterSubmit)}
        >
          <Input
            type="text"
            placeholder="Nombre del personaje"
            className="placeholder:text-gray-300"
            {...register("name", { required: false })}
          />
          <Input
            type="text"
            placeholder="Especie"
            className="placeholder:text-gray-300"
            {...register("species", { required: false })}
          />
          <Input
            type="text"
            placeholder="Tipo"
            className="placeholder:text-gray-300"
            {...register("type", { required: false })}
          />
          <Select {...register("gender", { required: false })}>
            <SelectTrigger className="text-gray-300">
              <SelectValue placeholder="Género" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Gender).map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            Filtrar
          </Button>
        </form>
      </section>
      <section className="flex justify-end w-full gap-2">
        <Button
          variant="outline"
          onClick={() => prevPage()}
          disabled={page === 1}
        >
          {"<"}
        </Button>
        <Button
          variant="outline"
          onClick={() => nextPage()}
          disabled={page === maxPage}
        >
          {">"}
        </Button>
      </section>
      <section className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-secondary">Avatar</TableHead>
              <TableHead className="text-secondary">Nombre</TableHead>
              <TableHead className="text-secondary">Estado</TableHead>
              <TableHead className="text-secondary">Especie</TableHead>
              <TableHead className="text-secondary">Género</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {characters.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={item.image} />
                  </Avatar>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.species}</TableCell>
                <TableCell>{item.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
}
