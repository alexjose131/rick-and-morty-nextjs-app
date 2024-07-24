import { z } from "zod";

// Personajes, y url no se definen ya que no se estan usando para este propósito
// o se requiere de implementación de lógica adicional.
export const newEpisodeSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre no puede estar vacío." })
    .max(30, { message: "El nombre no puede ser tan largo." }),
  air_date: z.date(),
  episode: z.string().regex(/^S\d{2}E\d{2}$/, {
    message: "El episodio no tiene un formato adecuado",
  }),
  created: z.date(),
});
