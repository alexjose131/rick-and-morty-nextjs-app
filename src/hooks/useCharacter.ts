import { fetchCharacters } from "@/services/character.service";
import { useCharacterStore } from "@/store/character-store";
import {
  APIResults,
  CharacterResult,
  ICharacterStatus,
  ICharacterUpdate,
} from "@/types/api-types";
import { CharacterFilters } from "@/types/app-types";
import { useCallback, useEffect, useState } from "react";
import { ToastTitle, useToastImp } from "./useToast";

export function useCharacter() {
  const {
    characters,
    newCharacters,
    setCharacters,
    setNewCharacter,
    updateCharacter,
  } = useCharacterStore();
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState("");
  const [maxPage, setMaxPage] = useState<number>(-1);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [filteredNewCharacters, setFilteredNewCharacters] =
    useState<CharacterResult[]>(newCharacters);
  const { showToast } = useToastImp();

  const getCharacters = async () => {
    try {
      setError("");
      const response = await fetchCharacters(filters, page);

      if (response.error && response.error === "There is nothing here") {
        setCharacters([]);
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

  const createCharacter = (character: CharacterResult) => {
    const newCharacter: CharacterResult = {
      ...character,
      id: Date.now(),
      created: new Date(),
    };
    setNewCharacter(newCharacter);
    showToast({
      title: ToastTitle.Exito,
      description: "Personaje creado satisfactoriamente.",
    });
  };

  const updateCharacterBasicInfo = (
    character: CharacterResult,
    newValues: ICharacterUpdate
  ) => {
    const { name, species, type, gender, ...oldData } = character;
    const updatedCharacter = { ...oldData, ...newValues };
    updateCharacter(updatedCharacter);
    showToast({
      title: ToastTitle.Exito,
      description: "Personaje actualizado satisfactoriamente.",
    });
  };

  const updateCharacterStatus = (
    character: CharacterResult,
    newValues: ICharacterStatus
  ) => {
    const { status, ...dataChar } = character;
    const updatedCharacter = { ...dataChar, ...newValues };
    updateCharacter(updatedCharacter);
    showToast({
      title: ToastTitle.Exito,
      description: "Estado del personaje actualizado satisfactoriamente.",
    });
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
    filterNewCharacters(filters);
  }, [page, filters, newCharacters]);

  useEffect(() => {
    if (!error) return;
    showToast({ title: ToastTitle.Error, description: error });
  }, [error]);

  return {
    error,
    characters,
    filteredNewCharacters,
    page,
    maxPage,
    nextPage,
    prevPage,
    updateFilters,
    createCharacter,
    updateCharacterBasicInfo,
    updateCharacterStatus,
  };
}
