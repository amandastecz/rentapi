import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCar: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCar = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const newCar = await createCar.execute({
            name: "New Car",
            description: "GLC 300",
            daily_rate: 100,
            license_plate: "5555555",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        expect(newCar).toHaveProperty("id");
    });

    it("should not to be able to create a car with an existent license plate", async () => {
        await createCar.execute({
            name: "Car 1",
            description: "GLC 300",
            daily_rate: 100,
            license_plate: "ZXC124",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });
        await expect(createCar.execute({
                name: "Car 2",
                description: "GLC 300",
                daily_rate: 100,
                license_plate: "ZXC124",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            })).rejects.toEqual(new AppError("Car already exists! Found a same license plate"));
    });

    it("should be able to create a new car with available true by default", async () => {
        const car =  await createCar.execute({
            name: "Car Available",
            description: "GLC 300",
            daily_rate: 100,
            license_plate: "888888ACB",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        expect(car.available).toBe(true);
    });
})