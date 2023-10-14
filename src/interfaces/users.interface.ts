import { z } from "zod";
import {
  UserReturnSchema,
  readAllCoursesByUserSchema,
  userCreateSchema,
  userSchema,
} from "../schemas/users.schema";
import { QueryResult } from "pg";

export type TypeUser = z.infer<typeof userSchema>;

export type TypeCreateUser = z.infer<typeof userCreateSchema>;

export type TypeUserResult = QueryResult<TypeUser>;
export type TypeUserReturn = z.infer<typeof UserReturnSchema>;

export type TypeReadAllUsers = Array<TypeUserReturn>;

export type TypeReadAllCoursesByUser = z.infer<
  typeof readAllCoursesByUserSchema
>;
