import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
        ){}

    async execute({ car_id, specifications_id }: IRequest): Promise<Car>{
        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists){
            throw new AppError("Car doesn't exists!");
        }

        const specificationExists = await this.specificationsRepository.findByIds(
            specifications_id
        );

        if(!specificationExists){
            throw new AppError("Specification doesn't exists!");
        }

        carExists.specifications = specificationExists;

        await this.carsRepository.create(carExists);

        return carExists;
    }
}

export { CreateCarSpecificationUseCase };