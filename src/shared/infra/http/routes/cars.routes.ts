import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { listAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImagesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensuredAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new listAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarController.handle);

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImageController.handle);

export { carsRoutes };