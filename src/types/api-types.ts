export interface APIResults {
  info: Info;
  results: CharacterResult[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface CharacterResult {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: Gender;
  origin?: Location;
  location?: Location;
  image?: string;
  episode: string[];
  url?: string;
  created: Date;
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Genderless = "Genderless",
  Unknown = "Unknown",
}

export interface Location {
  name: string;
  url: string;
}

export enum CharacterStatus {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "Unknown",
}

export interface ICharacterStatus {
  status: CharacterStatus;
}

export interface ICharacterUpdate {
  id: number;
  name: string;
  species: string;
  type: string;
  gender: Gender;
  origin?: Location;
  location?: Location;
  image?: string;
  episode: string[];
  url?: string;
  created: Date;
}
