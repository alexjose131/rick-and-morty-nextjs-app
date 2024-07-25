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
import { OptionsIcon } from "@/components/common/Icons";
import { Suspense, useEffect, useRef, useState } from "react";

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
                  Editar datos básicos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

const TableData = ({
  filteredNewEpisodes,
  episodes,
  page,
  setShowEditBasicInfo,
  setEpisode,
}: TableDataProps) => {
  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
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
          <label>No se han encontrado personajes</label>
        )}
      </Suspense>
    </>
  );
};

export default function LazyTableData({
  filteredNewEpisodes,
  episodes,
  page,
  setShowEditBasicInfo,
  setEpisode,
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
          filteredNewEpisodes={filteredNewEpisodes}
          episodes={episodes}
          page={page}
          setEpisode={setEpisode}
          setShowEditBasicInfo={setShowEditBasicInfo}
        />
      ) : null}
    </div>
  );
}
