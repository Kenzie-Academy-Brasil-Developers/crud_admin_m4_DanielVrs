import { z } from "zod";

export const userCoursesSchema = z.object({
  id: z.number().positive(),
  active: z.boolean().default(true),
  userId: z.number().positive(),
  courseId: z.number().positive(),
});
