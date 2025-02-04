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
  setNewCharacter: (character: CharacterResult) => {
    const { newCharacters } = get();
    set({ newCharacters: [character, ...newCharacters] });
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

    if (charactersStoreIndex !== -1) {
      structuredCharactersStore[charactersStoreIndex] = character;
      set({ characters: structuredCharactersStore });
    }
    if (newCharactersStoreIndex !== -1) {
      structuredNewCharactersStore[newCharactersStoreIndex] = character;
      set({ newCharacters: structuredNewCharactersStore });
    }
  },
  removeCharacters: () => {
    set({ characters: [] });
    set({ newCharacters: [] });
  },
});

export const useCharacterStore = create<CharacterState>()(
  persist(characterStoreSlice, { name: "characters" })
);
