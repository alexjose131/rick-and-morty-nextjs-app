import { fetchEpisodes } from "@/services/episodes.service";
import { useEpisodeStore } from "@/store/episode-store";
import { APIEpisodeResults, EpisodeResult } from "@/types/api-types";
import { EpisodeFilters } from "@/types/app-types";
import { useCallback, useEffect, useState } from "react";

export function useEpisode() {
  const { episodes, newEpisodes, setEpisodes } = useEpisodeStore((state) => ({
    episodes: state.episodes,
    newEpisodes: state.newEpisodes,
    setEpisodes: state.setEpisodes,
  }));
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState("");
  const [maxPage, setMaxPage] = useState<number>(-1);
  const [filters, setFilters] = useState<EpisodeFilters>({});
  const [filteredNewEpisodes, setFilteredNewEpisodes] =
    useState<EpisodeResult[]>(newEpisodes);

  const getEpisodes = async () => {
    try {
      setError("");
      const response = await fetchEpisodes(filters, page);
      console.log(response);
      if (response.error && response.error === "There is nothing here") {
        setEpisodes([]);
        setError("Failed to fetch episodes");
        return;
      }

      const data: APIEpisodeResults = response;
      setEpisodes(data.results);
      setMaxPage(data.info.pages);
    } catch (error) {
      console.log(error);
      setError("Error fetching episodes");
    }
  };

  const filterNewEpisodes = useCallback(
    (filters: EpisodeFilters) => {
      const { name = "", episode: episodeName = "" } = filters;

      // Filtrar los personajes basados en los filtros proporcionados
      const filteredEpisodes = newEpisodes.filter((episode) => {
        let matchesName = true;
        let matchesEpisode = true;

        if (name.trim() !== "" && episodeName.trim() !== "") return;

        if (name.trim() !== "") {
          matchesName = episode.name.toLowerCase().includes(name.toLowerCase());
        }
        if (episodeName.trim() !== "") {
          matchesEpisode = episode.episode
            .toLowerCase()
            .includes(episode.episode.toLowerCase());
        }

        return matchesName && matchesEpisode;
      });
      setFilteredNewEpisodes(filteredEpisodes);
    },
    [newEpisodes, setFilteredNewEpisodes]
  );

  const updateFilters = (filters: EpisodeFilters) => {
    setFilters(filters);
    setPage(1);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    getEpisodes();
    filterNewEpisodes(filters);
  }, [page, filters, newEpisodes]);

  return {
    error,
    episodes,
    filteredNewEpisodes,
    page,
    maxPage,
    nextPage,
    prevPage,
    updateFilters,
  };
}
