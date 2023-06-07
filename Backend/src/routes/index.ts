import { Router } from "express";
import { usersRoutes } from "./usersRoutes";
import { topicsRoutes } from "./topicsRoutes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/topics", topicsRoutes);


export {routes};