import { NextFunction, Request, Response } from "express";
import {
  createNewCourseService,
  deleteRegisterUserInCourseService,
  readAllCoursesService,
  readAllUserCourseService,
  registerUserInCourseService,
} from "../services/courses.service";
import { TypeRegisterUserInCourse } from "../interfaces/courses.interface";

export const createNewCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const course = await createNewCourseService(req.body);

  return res.status(201).json(course);
};

export const readAllCoursesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courses = await readAllCoursesService();

  return res.status(200).json(courses);
};

export const registerUserInCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { courseId, userId } = req.params;

  const data: TypeRegisterUserInCourse = {
    courseId,
    userId,
  };
  await registerUserInCourseService(data);

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const deleteRegisterUserInCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { courseId, userId } = req.params;

  await deleteRegisterUserInCourseService(courseId, userId);

  return res.status(204).json();
};

export const readAllUserCourseServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const allUsersInCourse = await readAllUserCourseService(id);

  return res.status(200).json(allUsersInCourse);
};
