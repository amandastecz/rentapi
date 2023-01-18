import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", ()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
    });

    it("should not be able to add a new specification to a non-existent car", async ()=>{
        expect(async ()=>{
            await createCarSpecificationUseCase.execute({
                car_id: "123456",
                specifications_id: ["546321"],
            });
        }).rejects.toBeInstanceOf(AppError);
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
        )

        await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: ["123456"],
        });
    });
})