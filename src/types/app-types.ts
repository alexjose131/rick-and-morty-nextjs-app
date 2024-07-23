import { Status, Gender } from "./api-types";

export type CredentialsInputs = {
  user: string;
  password: string;
};

export type CharacterFilters = {
  species?: string;
  type?: Status;
  gender?: Gender;
  name?: string;
};
