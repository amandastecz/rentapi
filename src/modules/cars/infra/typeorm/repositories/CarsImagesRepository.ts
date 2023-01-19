import { ICarsImagesRepository } from "../../../repositories/ICarsImagesRepository";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository{
    create(car_id: string, image_name: string): Promise<CarImage> {
        throw new Error("Method not implemented.");
    }
}

export{CarsImagesRepository}