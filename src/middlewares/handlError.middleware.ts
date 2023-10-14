import { NextFunction, Request, Response } from "express";
import AppError from "../errors/App.Error";
import { z } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleErrors = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof z.ZodError) {
    res.status(400).json(error.flatten().fieldErrors);
  }

  if (error instanceof JsonWebTokenError) {
    res.status(401).json({ message: error.message });
  }

  console.log(error);

  return res.status(500).json({ message: "Internal server error" });
};
