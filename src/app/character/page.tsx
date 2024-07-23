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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, OptionsIcon } from "@/components/common/Icons";
import { useRouter } from "next/navigation";

export default function CharacterPage() {
  const router = useRouter();
  const {
    error,
    characters,
    filteredNewCharacters,
    page,
    maxPage,
    prevPage,
    nextPage,
    updateFilters,
  } = useCharacter();
  const form = useForm<CharacterFilters>();

  const handleFilterSubmit = (data: CharacterFilters) => {
    updateFilters(data);
  };

  const handleCreationClick = () => {
    router.push("/character/create");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-10">Personajes</h2>
      <section className="mb-5 w-full">
        <p className="text-md text-gray-300 mb-1">Filtrar personajes:</p>
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
              name="species"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="species"
                      placeholder="Especie"
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Tipo"
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-gray-300">
                        <SelectValue placeholder="Género" />
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
                </FormItem>
              )}
            ></FormField>

            <Button type="submit" className="w-full">
              Filtrar
            </Button>
          </form>
        </Form>
      </section>
      <section className="flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-center md:justify-between w-full my-2">
        <div>
          <Button variant="default" onClick={() => handleCreationClick()}>
            Nuevo personaje
          </Button>
        </div>
        <div className="flex gap-2">
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
        </div>
      </section>
      {[...filteredNewCharacters, ...characters].length > 0 ? (
        <section className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-secondary"></TableHead>
                <TableHead className="text-secondary">Nombre</TableHead>
                <TableHead className="text-secondary">Género</TableHead>
                <TableHead className="text-secondary">Especie</TableHead>
                <TableHead className="text-secondary">Tipo</TableHead>
                <TableHead className="text-secondary">Estado</TableHead>
                <TableHead className="text-secondary"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {page === 1 &&
                filteredNewCharacters.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={item.image ? item.image : "/logo.svg"}
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.gender}</TableCell>
                    <TableCell>{item.species}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.status}</TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <OptionsIcon className="hover:text-accent" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <EditIcon /> Editar datos básicos
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <EditIcon /> Editar estado
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

              {characters.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={item.image ? item.image : "/logo.svg"}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.species}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.status}</TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <OptionsIcon className="hover:text-accent" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <EditIcon /> Editar datos básicos
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <EditIcon /> Editar estado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <p>No se han encontrado personajes</p>
      )}
    </div>
  );
}
