import { Router } from "express";
import { TopicsController } from "../controllers/TopicsController";

const topicsRoutes = Router();
const controller = new TopicsController;

topicsRoutes.get("/list", controller.list);
topicsRoutes.get("/:id", controller.show);
topicsRoutes.post("/create", controller.create);
topicsRoutes.put("/update/:id", controller.update);
topicsRoutes.delete("/delete/:id", controller.delete)
export {topicsRoutes};