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
  species: Species;
  type: Type;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
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

export enum Species {
  alien = "alien",
  human = "human",
}

export enum Status {
  alive = "alive",
  dead = "dead",
  unknown = "unknown",
}

export enum Type {
  Empty = "",
  GeneticExperiment = "Genetic experiment",
  SuperhumanGhostTrainsSummoner = "Superhuman (Ghost trains summoner)",
}
