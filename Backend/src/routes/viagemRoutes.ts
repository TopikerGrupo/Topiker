import { Router } from "express";
import { ViagemController } from "../controllers/ViagemController";

const viagemRoutes = Router();
const controller = new ViagemController();

viagemRoutes.post("/", controller.show);

export {viagemRoutes};