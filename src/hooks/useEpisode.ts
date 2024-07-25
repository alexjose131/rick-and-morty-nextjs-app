import { formatDate } from "@/lib/utils";
import { fetchEpisodes } from "@/services/episodes.service";
import { useEpisodeStore } from "@/store/episode-store";
import {
  APIEpisodeResults,
  EpisodeResult,
  IEpisodeUpdate,
} from "@/types/api-types";
import { EpisodeFilters } from "@/types/app-types";
import { useCallback, useEffect, useState } from "react";
import { ToastTitle, useToastImp } from "./useToast";

export function useEpisode() {
  const { showToast } = useToastImp();
  const { episodes, newEpisodes, setEpisodes, setNewEpisode, updateEpisode } =
    useEpisodeStore((state) => ({
      episodes: state.episodes,
      newEpisodes: state.newEpisodes,
      setEpisodes: state.setEpisodes,
      setNewEpisode: state.setNewEpisode,
      updateEpisode: state.updateEpisode,
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

      if (response.error && response.error === "There is nothing here") {
        setEpisodes([]);
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

  const createEpisode = (data: EpisodeResult) => {
    const transformedDate = formatDate(data.air_date);
    const newEpisode: EpisodeResult = {
      ...data,
      air_date: transformedDate,
      id: Date.now(),
      created: new Date(),
    };
    setNewEpisode(newEpisode);
    showToast({
      title: ToastTitle.Exito,
      description: "Episodio creado satisfactoriamente.",
    });
  };

  const updateEpisodeBasicInfo = (
    episode: EpisodeResult,
    data: IEpisodeUpdate
  ) => {
    const { name, air_date, episode: episodeString, ...dataEp } = episode;
    console.log(data.air_date);
    data.air_date = formatDate(data.air_date);
    console.log(data.air_date);
    const updatedEpisode = { ...dataEp, ...data };
    console.log(updatedEpisode);
    updateEpisode(updatedEpisode);
    showToast({
      title: ToastTitle.Exito,
      description: "Episodio actualizado satisfactoriamente.",
    });
  };

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
  }, [page, newEpisodes, filters]);

  useEffect(() => {
    if (!error) return;
    showToast({ title: ToastTitle.Error, description: error });
  }, [error]);

  return {
    error,
    episodes,
    filteredNewEpisodes,
    page,
    maxPage,
    nextPage,
    prevPage,
    updateFilters,
    createEpisode,
    updateEpisodeBasicInfo,
  };
}
