import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/inMemory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", ()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });

    it("should not be able to add a new specification to a non-existent car", async ()=>{
        await expect(createCarSpecificationUseCase.execute({
                car_id: "123456",
                specifications_id: ["546321"],
            })).rejects.toEqual(new AppError("Car doesn't exists!"));
    });

    it("should be able to add a new specification to an existent car", async ()=>{

        const car = await carsRepositoryInMemory.create(
            {
                name: "Car 7",
                description: "GLC 300",
                daily_rate: 100,
                license_plate: "8888341",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            }
        );

        const specification = await specificationsRepositoryInMemory.create({
            name: "Specification",
            description: "Unit test"
        });

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification.id],
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
})