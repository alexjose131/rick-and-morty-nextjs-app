import { Status, Gender } from "./api-types";

export type CredentialsInputs = {
  user: string;
  password: string;
};

export type CharacterFilters = {
  species?: string;
  type?: string;
  gender?: Gender;
  name?: string;
};
