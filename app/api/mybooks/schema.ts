import { z } from "zod";

export const userBookListSchema = z.object({
  userId: z.string().length(24),
  bookIDs: z.array(z.string().length(24)),
  books: z.array(z.string().length(24)),
});

export default userBookListSchema;
