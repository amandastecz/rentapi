import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCar: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCar = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should be able to create a new car", async () => {
        await createCar.execute({
            name: "Mercedes Benz",
            description: "GLC 300",
            daily_rate: 100,
            license_plate: "ABC",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });
    })
})