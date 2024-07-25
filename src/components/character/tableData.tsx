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
import { CharacterResult } from "@/types/api-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OptionsIcon } from "@/components/common/Icons";
import { useEffect, useState } from "react";

interface TableDataProps {
  filteredNewCharacters: CharacterResult[];
  characters: CharacterResult[];
  page: number;
  setShowEditBasicInfo: (open: boolean) => void;
  setShowEditStatus: (open: boolean) => void;
  setCharacter: (character: CharacterResult) => void;
}

interface TableRowDisplay {
  data: CharacterResult[];
  setShowEditBasicInfo: (open: boolean) => void;
  setShowEditStatus: (open: boolean) => void;
  setCharacter: (character: CharacterResult) => void;
}

const TableRowDisplay = ({
  data,
  setShowEditBasicInfo,
  setShowEditStatus,
  setCharacter,
}: TableRowDisplay) => {
  const hadleEditBasic = (character: CharacterResult) => {
    setCharacter(character);
    setShowEditBasicInfo(true);
  };

  const hadleEditStatus = (character: CharacterResult) => {
    setCharacter(character);
    setShowEditStatus(true);
  };
  return (
    <>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell>
            <Avatar>
              <AvatarImage src={item.image ? item.image : "/logo.svg"} />
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
                <DropdownMenuItem onClick={() => hadleEditBasic(item)}>
                  Editar datos básicos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => hadleEditStatus(item)}>
                  Editar estado
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const TableData = ({
  filteredNewCharacters,
  characters,
  page,
  setShowEditBasicInfo,
  setShowEditStatus,
  setCharacter,
}: TableDataProps) => {
  return (
    <>
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
              {page === 1 && (
                <TableRowDisplay
                  data={filteredNewCharacters}
                  setCharacter={setCharacter}
                  setShowEditBasicInfo={setShowEditBasicInfo}
                  setShowEditStatus={setShowEditStatus}
                />
              )}

              <TableRowDisplay
                data={characters}
                setCharacter={setCharacter}
                setShowEditBasicInfo={setShowEditBasicInfo}
                setShowEditStatus={setShowEditStatus}
              />
            </TableBody>
          </Table>
        </section>
      ) : (
        <label>No se han encontrado personajes</label>
      )}
    </>
  );
};

export default function LazyTableData({
  filteredNewCharacters,
  characters,
  page,
  setShowEditBasicInfo,
  setShowEditStatus,
  setCharacter,
}: TableDataProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onChange = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(onChange, {
      rootMargin: "100px",
    });

    observer.observe(document.getElementById("LazyTableData") as HTMLElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="LazyTableData">
      {show ? (
        <TableData
          filteredNewCharacters={filteredNewCharacters}
          characters={characters}
          page={page}
          setCharacter={setCharacter}
          setShowEditStatus={setShowEditStatus}
          setShowEditBasicInfo={setShowEditBasicInfo}
        />
      ) : null}
    </div>
  );
}
