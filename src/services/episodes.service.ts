import { EpisodeFilters } from "@/types/app-types";

const CHARACTER_URL = "https://rickandmortyapi.com/api/episode";

export const fetchEpisodes = async (filters: EpisodeFilters, page: number) => {
  const { name, episode } = filters;

  const filterString = `${episode ? `&episode=${episode}` : ""}${
    name ? `&name=${name}` : ""
  }`;

  const response = await fetch(`${CHARACTER_URL}?page=${page}` + filterString);
  return await response.json();
};
