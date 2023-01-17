import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest{
    brand?: string
    name?: string,
    category_id?: string;
};

class ListCarsUseCase{

    constructor(
        private carsRepository: ICarsRepository
    ){}
    
    async execute({ brand, name, category_id }: IRequest): Promise<Car[]>{
        const cars = await this.carsRepository.findAvailable(brand, name, category_id);
        return cars;
    }
}

export { ListCarsUseCase }