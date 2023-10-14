import { Router } from "express";
import { usersRoutes } from "./users.route";
import { coursesRoutes } from "./courses.route";
import { loginRoute } from "./login.route";

export const routes: Router = Router();

routes.use("/users", usersRoutes);
routes.use("/login", loginRoute);
routes.use("/courses", coursesRoutes);
