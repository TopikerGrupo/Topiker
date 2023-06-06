import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();
const controller = new UsersController();

usersRoutes.get("/list", controller.list);
usersRoutes.get("/:id", controller.show)

export {usersRoutes};