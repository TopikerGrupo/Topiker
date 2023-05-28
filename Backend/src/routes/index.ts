import { Router } from "express";
import { helloWorldRoutes } from "./helloWorldRoutes";

const routes = Router();

routes.use("/hello-world", helloWorldRoutes);

export {routes};