import { EpisodeFilters } from "@/types/app-types";
import { EPISODE_URL } from ".";

export const fetchEpisodes = async (filters: EpisodeFilters, page: number) => {
  const { name, episode } = filters;

  const filterString = `${episode ? `&episode=${episode}` : ""}${
    name ? `&name=${name}` : ""
  }`;

  const response = await fetch(`${EPISODE_URL}?page=${page}` + filterString);
  return await response.json();
};
