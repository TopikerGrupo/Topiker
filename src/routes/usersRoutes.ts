import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();
const controller = new UsersController();

usersRoutes.post("/create", controller.create);
usersRoutes.use(ensureAuthenticate);

usersRoutes.get("/list", controller.list);
usersRoutes.get("/show/:id", controller.show);
usersRoutes.post("/create", controller.create);
usersRoutes.put("/update/:id", controller.update);
usersRoutes.delete("/delete/:id", controller.delete)

export {usersRoutes};