"use client";

import { EpisodeResult } from "@/types/api-types";
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
import { EditIcon, OptionsIcon } from "@/components/common/Icons";

interface TableDataProps {
  filteredNewEpisodes: EpisodeResult[];
  episodes: EpisodeResult[];
  page: number;
  setShowEditBasicInfo: (open: boolean) => void;
  setEpisode: (episode: EpisodeResult) => void;
}

interface TableRowDisplay {
  data: EpisodeResult[];
  setShowEditBasicInfo: (open: boolean) => void;
  setEpisode: (episode: EpisodeResult) => void;
}

const TableRowDisplay = ({
  data,
  setShowEditBasicInfo,
  setEpisode,
}: TableRowDisplay) => {
  const handleEditBasic = (episode: EpisodeResult) => {
    setEpisode(episode);
    setShowEditBasicInfo(true);
  };
  return (
    <>
      {data.map((item) => (
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
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const TableData = ({
  filteredNewEpisodes,
  episodes,
  page,
  setShowEditBasicInfo,
  setEpisode,
}: TableDataProps) => {
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
            {page === 1 && (
              <TableRowDisplay
                data={filteredNewEpisodes}
                setShowEditBasicInfo={setShowEditBasicInfo}
                setEpisode={setEpisode}
              />
            )}

            <TableRowDisplay
              data={episodes}
              setShowEditBasicInfo={setShowEditBasicInfo}
              setEpisode={setEpisode}
            />
          </TableBody>
        </Table>
      ) : (
        <p>No se han encontrado personajes</p>
      )}
    </>
  );
};
