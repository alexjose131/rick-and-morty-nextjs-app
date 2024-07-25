"use client";

import { EpisodeResult } from "@/types/api-types";
import { useState, lazy, Suspense } from "react";
import { useEpisode } from "@/hooks/useEpisode";
import { EditEpisodeBasicInfo } from "@/components/episode/editEpisodeBasicInfo";
import { FilterData } from "@/components/episode/filterData";
import { Options } from "@/components/episode/options";
import { TableSkeleton } from "@/components/common/tableSkeleton";

const TableData = lazy(() => import("../../components/episode/tableData"));

export default function EpisodePage() {
  const {
    page,
    filteredNewEpisodes,
    episodes,
    maxPage,
    updateFilters,
    prevPage,
    nextPage,
  } = useEpisode();

  const [showEditBasicInfo, setShowEditBasicInfo] = useState(false);
  const [episode, setEpisode] = useState<EpisodeResult>();

  const updateEpisode = (episodeSelected: EpisodeResult) => {
    setEpisode(episodeSelected);
  };

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
        <Suspense fallback={<TableSkeleton />}>
          <TableData
            page={page}
            filteredNewEpisodes={filteredNewEpisodes}
            episodes={episodes}
            setEpisode={updateEpisode}
            setShowEditBasicInfo={setShowEditBasicInfo}
          />
        </Suspense>
      </section>
      {showEditBasicInfo && episode && (
        <EditEpisodeBasicInfo
          episode={episode}
          isOpen={showEditBasicInfo}
          onClose={() => setShowEditBasicInfo(false)}
        />
      )}
    </div>
  );
}
