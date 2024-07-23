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
  status: Status;
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
  female = "female",
  male = "male",
  genderless = "genderless",
  unknown = "unknown",
}

export interface Location {
  name: string;
  url: string;
}

export enum Status {
  alive = "alive",
  dead = "dead",
  unknown = "unknown",
}
