import {Router } from "express";

import { ensureAuthenticated, } from "../middlewares/ensuredAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export {specificationsRoutes};  