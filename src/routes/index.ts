import { Router } from "express";
import { usersRoutes } from "./usersRoutes";
import { topicsRoutes } from "./topicsRoutes";
import { routesRoutes } from "./routesRoutes";
import { viagemRoutes } from "./viagemRoutes";
import { authenticateRoutes } from "./authenticateRoutes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/topics", topicsRoutes);
routes.use("/routes", routesRoutes);
routes.use("/viagem", viagemRoutes);
routes.use("/sessions", authenticateRoutes);

export {routes};