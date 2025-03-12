import { z } from "zod";

export const SignUpFormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
