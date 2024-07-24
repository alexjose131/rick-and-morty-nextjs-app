import { EpisodeResult } from "@/types/api-types";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface EpisodeState {
  episodes: EpisodeResult[];
  newEpisodes: EpisodeResult[];
  setEpisodes: (episodes: EpisodeResult[]) => void;
  setNewEpisodes: (episodes: EpisodeResult) => void;
  updateEpisode: (episode: EpisodeResult) => void;
  removeEpisodes: () => void;
}

const episodeStoreSlice: StateCreator<EpisodeState> = (set, get) => ({
  episodes: [],
  newEpisodes: [],
  setEpisodes: (episodes: EpisodeResult[]) => {
    set({ episodes: episodes });
  },
  setNewEpisodes: (episode: EpisodeResult) => {
    const { newEpisodes } = get();
    set({ newEpisodes: [episode, ...newEpisodes] });
  },
  updateEpisode: (episode: EpisodeResult) => {
    const { episodes: episodesStore } = get();
    const { newEpisodes: newEpisodesStore } = get();

    const structuredEpisodesStore = structuredClone(episodesStore);
    const structuredNewEpisodesStore = structuredClone(newEpisodesStore);

    const episodesStoreIndex = structuredEpisodesStore.findIndex(
      (ep) => ep.id === episode.id
    );

    const newEpisodesStoreIndex = structuredNewEpisodesStore.findIndex(
      (ep) => ep.id === episode.id
    );

    if (episodesStoreIndex !== -1) {
      structuredEpisodesStore[episodesStoreIndex] = episode;
      set({ episodes: structuredEpisodesStore });
    }
    if (newEpisodesStoreIndex !== -1) {
      structuredNewEpisodesStore[newEpisodesStoreIndex] = episode;
      set({ newEpisodes: structuredNewEpisodesStore });
    }
  },
  removeEpisodes: () => {
    set({ episodes: [] });
    set({ newEpisodes: [] });
  },
});

export const useEpisodeStore = create<EpisodeState>()(
  persist(episodeStoreSlice, { name: "episode" })
);
