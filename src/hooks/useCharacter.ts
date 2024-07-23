import { fetchCharacters } from "@/services/character.service";
import { useCharacterStore } from "@/store/character-store";
import { APIResults, CharacterResult } from "@/types/api-types";
import { CharacterFilters } from "@/types/app-types";
import { useCallback, useEffect, useState } from "react";

export function useCharacter() {
  const { characters, newCharacters, setCharacters } = useCharacterStore();
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState("");
  const [maxPage, setMaxPage] = useState<number>();
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [filteredNewCharacters, setFilteredNewCharacters] =
    useState<CharacterResult[]>(newCharacters);

  const getCharacters = async () => {
    try {
      setError("");
      const response = await fetchCharacters(filters, page);

      if (response.error && response.error === "There is nothing here") {
        setCharacters([]);
        setError("Failed to fetch characters");
        return;
      }

      const data: APIResults = response;
      setCharacters(data.results);
      setMaxPage(data.info.pages);
    } catch (error) {
      console.log(error);
      setError("Error fetching characters");
    }
  };

  const filterNewCharacters = useCallback(
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
  };

  useEffect(() => {
    getCharacters();
    filterNewCharacters(filters);
  }, [page, filters, newCharacters]);

  return {
    error,
    characters,
    filteredNewCharacters,
    page,
    maxPage,
    nextPage,
    prevPage,
    updateFilters,
  };
}
