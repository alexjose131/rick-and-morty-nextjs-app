import { fetchCharacters } from "@/services/character.service";
import { APIResults, CharacterResult } from "@/types/api-types";
import { CharacterFilters } from "@/types/app-types";
import { useEffect, useState, useRef } from "react";

export function useCharacter() {
  const [characters, setCharacters] = useState<CharacterResult[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState("");
  const [maxPage, setMaxPage] = useState<number>();
  const [filters, setFilters] = useState<CharacterFilters>({});

  const getCharacters = async () => {
    try {
      setError("");
      const response = await fetchCharacters(filters, page);
      if (!response.ok) {
        setError("Failed to fetch characters");
        return;
      }
      const data: APIResults = await response.json();
      setCharacters(data.results);
      setMaxPage(data.info.pages);
    } catch (error) {
      setError("Error fetching characters");
    }
  };

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
  }, [page, filters]);

  return {
    error,
    characters,
    page,
    maxPage,
    nextPage,
    prevPage,
    updateFilters,
  };
}
