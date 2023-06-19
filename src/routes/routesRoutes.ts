import { Router } from "express";
import { RoutesController } from "../controllers/RoutesController";

const routesRoutes = Router();
const controller = new RoutesController;

routesRoutes.get("/list", controller.list);
routesRoutes.get("/show/:id", controller.show);
routesRoutes.post("/create", controller.create);
routesRoutes.put("/update/:id", controller.update);
routesRoutes.delete("/delete/:id", controller.delete)
export {routesRoutes};