import { CharacterFilters } from "@/types/app-types";

const CHARACTER_URL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (
  filters: CharacterFilters,
  page: number
) => {
  const { species, type, gender, name } = filters;

  const filterString = `${species ? `&species=${species}` : ""}${
    type ? `&type=${type}` : ""
  }${gender ? `&gender=${gender}` : ""}${name ? `&name=${name}` : ""}`;

  const response = await fetch(`${CHARACTER_URL}?page=${page}` + filterString);
  return await response.json();
};
