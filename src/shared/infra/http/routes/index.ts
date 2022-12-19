import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specification.route";
import { usersRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes"; 

const router = Router();

// Passando a route dessa forma, significa que todas os routers categories terão essa rota
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use(authenticateRoutes);

export {router};