import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();
const controller = new UsersController();

usersRoutes.get("/list", controller.list);
usersRoutes.get("show/:id", controller.show);
usersRoutes.post("/create", controller.create);
usersRoutes.put("/update/:id", controller.update);
usersRoutes.delete("/delete/:id", controller.delete)

export {usersRoutes};