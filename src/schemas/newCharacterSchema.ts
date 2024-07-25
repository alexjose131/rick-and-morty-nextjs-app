import { Gender, CharacterStatus } from "@/types/api-types";
import { z } from "zod";

const statusValues: [string, ...string[]] = Object.keys(CharacterStatus) as [
  string,
  ...string[]
];
const genderValues: [string, ...string[]] = Object.keys(Gender) as [
  string,
  ...string[]
];

// Origen, Localidad, imagen y url no se definen ya que no se estan usando para este propósito
// o se requiere de implementación de lógica adicional.
export const newCharacterSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre no puede estar vacío." })
    .max(30, { message: "El nombre no puede ser tan largo." }),
  status: z.enum(statusValues, {
    message: "El estado no puede estar vacío",
  }),
  species: z
    .string()
    .min(1, { message: "La especie no puede estar vacía" })
    .max(30, { message: "La especie no puede ser tan larga." }),
  type: z
    .string()
    .max(30, { message: "El tipo no puede ser tan largo." })
    .nullish(),
  gender: z.enum(genderValues, {
    message: "El género no puede estar vacío",
  }),
});
