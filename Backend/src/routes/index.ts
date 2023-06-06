import { Router } from "express";
import { usersRoutes } from "./usersRoutes";

const routes = Router();

routes.use("/users", usersRoutes);


export {routes};