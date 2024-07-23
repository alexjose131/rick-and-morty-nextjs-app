"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useCharacter } from "@/hooks/useCharacter";
import { CharacterResult } from "@/types/api-types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

export default function CharacterPage() {
  const { getCharacters } = useCharacter();
  const [characters, setCharacters] = useState<CharacterResult[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    getCharacters()
      .then((response) => {
        setCharacters(response);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <>
      <h2 className="text-start text-3xl mb-10 md:mb-20">Personajes</h2>
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
    </>
  );
}
