import { fetchCharacters } from "@/services/character.service";
import { APIResults, CharacterResult } from "@/types/api-types";

export function useCharacter() {
  const getCharacters = async (): Promise<CharacterResult[]> => {
    try {
      const response = await fetchCharacters();
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data: APIResults = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw Error("Error fetching characters");
    }
  };

  return { getCharacters };
}
