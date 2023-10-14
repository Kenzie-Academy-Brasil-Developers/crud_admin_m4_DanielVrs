import { Request, Response } from "express";
import { TypeCreateUser, TypeUserReturn } from "../interfaces/users.interface";
import {
  createNewUserService,
  readAllCoursesByUserService,
  readAllUsersService,
} from "../services/users.service";

export const createNewUserController = async (req: Request, res: Response) => {
  const data: TypeCreateUser = req.body;

  const user: TypeUserReturn = await createNewUserService(data);

  return res.status(201).json(user);
};

export const readAllUserController = async (req: Request, res: Response) => {
  const users = await readAllUsersService();

  return res.status(200).json(users);
};

export const readAllCoursesByUserController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const users = await readAllCoursesByUserService(id);

  return res.status(200).json(users);
};
