import { z } from "zod";

export const loginSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
