import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", ()=>{
    beforeEach(() =>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    test("should be able to list all available cars", async ()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Car 1",
            daily_rate: 160,
			description: "description",
            license_plate: "4412444",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category_id"
        });

        const cars = await listCarUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    test("should be able to list all available cars by name", async()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Audi Q7",
            daily_rate: 160,
			description: "description",
            license_plate: "4412444",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category_id"
        });

        const cars = await listCarUseCase.execute({
            name: "Audi Q7",
        });
    })
})