import { Gender } from "@/types/api-types";
import { z } from "zod";

const genderValues: [string, ...string[]] = Object.keys(Gender) as [
  string,
  ...string[]
];

// Origen, Localidad, imagen y url no se definen ya que no se estan usando para este propósito
// o se requiere de implementación de lógica adicional.
export const updateCharacterSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre no puede estar vacío." })
    .max(30, { message: "El nombre no puede ser tan largo." }),
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
