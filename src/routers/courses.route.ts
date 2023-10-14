import { Router } from "express";
import {
  createNewCourseController,
  deleteRegisterUserInCourseController,
  readAllCoursesController,
  readAllUserCourseServiceController,
  registerUserInCourseController,
} from "../controllers/courses.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createCourseSchema } from "../schemas/courses.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { verifyUserAndCourse } from "../middlewares/verifyUserAndCourse.middleware";

export const coursesRoutes: Router = Router();

coursesRoutes.post(
  "/",
  validateBody(createCourseSchema),
  verifyToken,
  verifyPermission,
  createNewCourseController
);
coursesRoutes.get("/", readAllCoursesController);

coursesRoutes.post(
  "/:courseId/users/:userId",
  verifyUserAndCourse,
  verifyToken,
  verifyPermission,
  registerUserInCourseController
);

coursesRoutes.delete(
  "/:courseId/users/:userId",
  verifyUserAndCourse,
  verifyToken,
  verifyPermission,
  deleteRegisterUserInCourseController
);

coursesRoutes.get(
  "/:id/users",
  verifyToken,
  verifyPermission,
  readAllUserCourseServiceController
);
