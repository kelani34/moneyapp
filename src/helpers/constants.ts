// constants.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(5)
    .max(100, { message: "Email address is too long" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
