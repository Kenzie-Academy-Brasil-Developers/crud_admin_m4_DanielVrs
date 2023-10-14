import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().max(60).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

export const userCreateSchema = userSchema.omit({ id: true });

export const UserReturnSchema = userSchema.omit({ password: true });

export const UsersReturnSchema = z.array(UserReturnSchema);

export const readAllCoursesByUserSchema = z.object({
  couseId: z.number().positive(),
  courseName: z.string().max(15),
  courseDescription: z.string(),
  userActiveInCourse: z.boolean(),
  userId: z.number().positive(),
  userName: z.string().max(50),
});
