import { CharacterResult } from "@/types/api-types";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface CharacterState {
  characters: CharacterResult[];
  newCharacters: CharacterResult[];
  setCharacters: (characters: CharacterResult[]) => void;
  setNewCharacter: (character: CharacterResult) => void;
  updateCharacter: (character: CharacterResult) => void;
  removeCharacters: () => void;
}

const characterStoreSlice: StateCreator<CharacterState> = (set, get) => ({
  characters: [],
  newCharacters: [],
  setCharacters: (characters: CharacterResult[]) => {
    set({ characters: characters });
  },
  setNewCharacter: (characters: CharacterResult) => {
    const { newCharacters } = get();
    set({ newCharacters: [...newCharacters, characters] });
  },
  updateCharacter: (character: CharacterResult) => {
    const { characters: charactersStore } = get();
    const { newCharacters: newCharactersStore } = get();

    const structuredCharactersStore = structuredClone(charactersStore);
    const structuredNewCharactersStore = structuredClone(newCharactersStore);

    const charactersStoreIndex = structuredCharactersStore.findIndex(
      (ch) => ch.id === character.id
    );

    const newCharactersStoreIndex = structuredNewCharactersStore.findIndex(
      (ch) => ch.id === character.id
    );

    if (charactersStoreIndex) {
      structuredCharactersStore[charactersStoreIndex] = character;
      set({ characters: structuredCharactersStore });
    }
    if (newCharactersStoreIndex) {
      structuredNewCharactersStore[newCharactersStoreIndex] = character;
      set({ newCharacters: structuredNewCharactersStore });
    }
  },
  removeCharacters: () => {},
});

export const useCharacterStore = create<CharacterState>()(
  persist(characterStoreSlice, { name: "characters" })
);
