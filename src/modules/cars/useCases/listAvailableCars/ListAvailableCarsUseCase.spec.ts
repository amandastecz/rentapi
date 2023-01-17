import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", ()=>{
    beforeEach(() =>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    test("should be able to list all available cars", async ()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Car 1",
            daily_rate: 160,
			description: "description",
            license_plate: "4534531",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category_id"
        });

        const cars = await listAvailableCarUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    test("should be able to list all available cars by name", async()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Audi Q7",
            daily_rate: 160,
			description: "description",
            license_plate: "2938948",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category_id"
        });

        const cars = await listAvailableCarUseCase.execute({
            name: "Audi Q7",
        });
    });

    test("should be able to list all available cars by brand", async()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Car 3",
            daily_rate: 160,
			description: "description",
            license_plate: "092849",
            fine_amount: 60,
            brand: "car3_brand",
            category_id: "category_id"
        });

        const cars = await listAvailableCarUseCase.execute({
            brand: "car3_brand",
        });
    });

    test("should be able to list all available cars by category_id", async()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Car 4",
            daily_rate: 160,
			description: "description",
            license_plate: "4412232",
            fine_amount: 60,
            brand: "car3_brand",
            category_id: "category_id_test"
        });

        const cars = await listAvailableCarUseCase.execute({
            category_id: "category_id_test",
        });
    });
})