import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specification.route";

const router = Router();

// Passando a route dessa forma, significa que todas os routers categories terão essa rota
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);


export {router};