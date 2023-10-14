import { NextFunction, Request, Response } from "express";
import { defaultQuery } from "../utils/defaultQuery";
import AppError from "../errors/App.Error";

export const verifyRegisterCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const queryCourses = await defaultQuery(
    'SELECT * FROM "userCourses" WHERE "userId" = (%L);',
    [id]
  );

  if (!queryCourses.rowCount) {
    throw new AppError("No course found", 404);
  }

  return next();
};
