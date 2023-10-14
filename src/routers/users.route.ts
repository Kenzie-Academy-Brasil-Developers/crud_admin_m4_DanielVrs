import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/users.schema";
import {
  createNewUserController,
  readAllCoursesByUserController,
  readAllUserController,
} from "../controllers/usersController";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { verifyRegisterCourse } from "../middlewares/verifyRegisterCourse.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "/",
  validateBody(userCreateSchema),
  verifyEmail,
  createNewUserController
);
usersRoutes.get("/", verifyToken, verifyPermission, readAllUserController);

usersRoutes.get(
  "/:id/courses",
  verifyRegisterCourse,
  verifyToken,
  verifyPermission,
  readAllCoursesByUserController
);
