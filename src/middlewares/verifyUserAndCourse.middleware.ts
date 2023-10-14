import { NextFunction, Request, Response } from "express";
import { defaultQuery } from "../utils/defaultQuery";
import AppError from "../errors/App.Error";

export const verifyUserAndCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { courseId, userId } = req.params;

  const queryUser = await defaultQuery(
    'SELECT * FROM "users" WHERE "id" = (%L);',
    [userId]
  );
  const queryCourses = await defaultQuery(
    'SELECT * FROM "courses" WHERE "id" = (%L);',
    [courseId]
  );

  if (!queryUser.rowCount || !queryCourses.rowCount) {
    throw new AppError("User/course not found", 404);
  }

  return next();
};
