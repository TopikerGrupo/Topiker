import { Router } from "express";
import { HelloWorldController } from "../controllers/Helloworldcontroller";

const helloWorldRoutes = Router();
const controller = new HelloWorldController();

helloWorldRoutes.get("", controller.show);

export {helloWorldRoutes};