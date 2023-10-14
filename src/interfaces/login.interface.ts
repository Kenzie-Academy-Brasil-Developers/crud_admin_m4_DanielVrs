import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";
import { QueryResult } from "pg";

export type TypeLogin = z.infer<typeof loginSchema>;
export type TypeLoginResult = QueryResult<TypeLogin>;
