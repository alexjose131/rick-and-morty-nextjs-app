import { Gender, CharacterStatus } from "@/types/api-types";
import { z } from "zod";

const statusValues: [string, ...string[]] = Object.keys(CharacterStatus) as [
  string,
  ...string[]
];

// Origen, Localidad, imagen y url no se definen ya que no se estan usando para este propósito
// o se requiere de implementación de lógica adicional.
export const editCharacterStatusSchema = z.object({
  status: z.enum(statusValues, {
    message: "El estado no puede estar vacío",
  }),
});
