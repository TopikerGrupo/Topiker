import { Router } from "express";
import { ViagemController } from "../controllers/ViagemController";

const viagemRoutes = Router();
const controller = new ViagemController();

viagemRoutes.get("/", controller.list);

export {viagemRoutes};