import { z } from "zod";

export const user = z.object({
  userId: z.string().length(24),
  password: z.string().length(24),
  name: z.string().length(24),
  bookList: z.array(z.string().length(24)),
});

export default user;
