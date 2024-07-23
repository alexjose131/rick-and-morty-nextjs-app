import { z } from "zod";

export const credentialsSchema = z.object({
  user: z
    .string()
    .min(1, { message: "El usuario es requerido." })
    .max(100, { message: "El usuario es demasiado grande." }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida." })
    .max(100, { message: "La contraseña es demasiado larga." }),
});
