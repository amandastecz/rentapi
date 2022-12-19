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
        const newCar = {
            name: "New Car",
            description: "GLC 300",
            daily_rate: 100,
            license_plate: "5555555",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        };
        await createCar.execute({
            name: newCar.name,
            description: newCar.description,
            daily_rate: newCar.daily_rate,
            license_plate: newCar.license_plate,
            fine_amount: newCar.fine_amount,
            brand: newCar.brand,
            category_id: newCar.category_id,
        });

       // const carCreated = await carsRepositoryInMemory.findByLicensePlate(newCar.license_plate);

       // expect(carCreated).toHaveProperty("id");
    });

    it("should not to be able to create a car with an existent license plate", async () => {
        expect(async () =>{
            await createCar.execute({
                name: "Car 1",
                description: "GLC 300",
                daily_rate: 100,
                license_plate: "ZXC124",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            });

            await createCar.execute({
                name: "Car 2",
                description: "GLC 300",
                daily_rate: 100,
                license_plate: "ZXC124",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})