import { NextFunction, Request, Response } from "express";
import { TypeUserResult } from "../interfaces/users.interface";
import { defaultQuery } from "../utils/defaultQuery";
import AppError from "../errors/App.Error";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email = req.body.email;

  const queryResult: TypeUserResult = await defaultQuery(
    'SELECT * FROM "users" WHERE "email" = (%L);',
    [email]
  );

  if (queryResult.rowCount) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};
