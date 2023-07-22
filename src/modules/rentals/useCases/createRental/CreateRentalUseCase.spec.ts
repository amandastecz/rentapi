import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/inMemory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/inMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Create Rental', () => {
    const dayAdd48Hours = dayjs().add(2, "day").toDate();

    beforeEach(()=>{
        dateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(dateProvider, rentalsRepositoryInMemory, carsRepositoryInMemory);
    });

    it('should be able to create a new rental', async ()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1123",
            brand: "brand"
        });

        const rental = await createRentalUseCase.execute({
            user_id: "123123",
            car_id: car.id,
            expected_return_date: dayAdd48Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it('should not be able to create a new rental if there is another open to the same user', async ()=>{
        await rentalsRepositoryInMemory.create({
            user_id: "123123",
            car_id: "999978",
            expected_return_date: dayAdd48Hours,
        });
        await expect(createRentalUseCase.execute({
                user_id: "123123",
                car_id: "123123",
                expected_return_date: dayAdd48Hours,
            })).rejects.toEqual(new AppError("There is a rental in progress for user!"));
    });

    it('should not be able to create a new rental if there is another open to the same car', async ()=>{
        await rentalsRepositoryInMemory.create({
            user_id: "321",
            car_id: "car2",
            expected_return_date: dayAdd48Hours,
        });
        await expect(createRentalUseCase.execute({
                user_id: "321",
                car_id: "car2",
                expected_return_date: dayAdd48Hours,
            })).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it('should not be able to create a new rental with invalid return time', async ()=>{
        await expect(createRentalUseCase.execute({
                user_id: "456",
                car_id: "654",
                expected_return_date: dayjs().toDate(),
            })).rejects.toEqual(new AppError("Invalid return time!"));
    });
})