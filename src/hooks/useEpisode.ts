import { fetchEpisodes } from "@/services/episodes.service";
import { useEpisodeStore } from "@/store/episode-store";
import { APIEpisodeResults, EpisodeResult } from "@/types/api-types";
import { CharacterFilters } from "@/types/app-types";
import { useEffect, useState } from "react";

export function useEpisode() {
  const { episodes, newEpisodes, setEpisodes } = useEpisodeStore((state) => ({
    episodes: state.episodes,
    newEpisodes: state.newEpisodes,
    setEpisodes: state.setEpisodes,
  }));
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState("");
  const [maxPage, setMaxPage] = useState<number>();
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [filteredNewEpisodes, setFilteredNewEpisodes] =
    useState<EpisodeResult[]>(newEpisodes);

  const getEpisodes = async () => {
    try {
      setError("");
      const response = await fetchEpisodes(filters, page);
      console.log(response);
      if (response.error && response.error === "There is nothing here") {
        setEpisodes([]);
        setError("Failed to fetch characters");
        return;
      }

      const data: APIEpisodeResults = response;
      setEpisodes(data.results);
      setMaxPage(data.info.pages);
    } catch (error) {
      console.log(error);
      setError("Error fetching characters");
    }
  };

  /*const filterNewCharacters = useCallback(
    (filters: CharacterFilters) => {
      const { name = "", gender = "", species = "", type = "" } = filters;

      // Filtrar los personajes basados en los filtros proporcionados
      const filteredCharacters = newCharacters.filter((character) => {
        let matchesName = true;
        let matchesGender = true;
        let matchesSpecies = true;
        let matchesType = true;

        if (
          name.trim() !== "" &&
          gender.trim() !== "" &&
          species.trim() !== "" &&
          type.trim() !== ""
        )
          return;

        if (name.trim() !== "") {
          matchesName = character.name
            .toLowerCase()
            .includes(name.toLowerCase());
        }
        if (gender.trim() !== "") {
          matchesGender =
            character.gender.toLowerCase() === gender.toLowerCase();
        }
        if (species.trim() !== "") {
          matchesSpecies = character.species
            .toLowerCase()
            .includes(species.toLowerCase());
        }
        if (type.trim() !== "") {
          matchesType = character.type
            .toLowerCase()
            .includes(type.toLowerCase());
        }

        return matchesName && matchesGender && matchesSpecies && matchesType;
      });
      setFilteredNewCharacters(filteredCharacters);
    },
    [newCharacters, setFilteredNewCharacters]
  );

  const updateFilters = (filters: CharacterFilters) => {
    setFilters(filters);
    setPage(1);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage((prevPage) => prevPage - 1);
  };*/

  useEffect(() => {
    getEpisodes();
    //filterNewCharacters(filters);
  }, [page, filters, newEpisodes]);

  return {
    error,
    episodes,
    filteredNewEpisodes,
    page,
    maxPage,
    //nextPage,
    //prevPage,
    //updateFilters,
  };
}
