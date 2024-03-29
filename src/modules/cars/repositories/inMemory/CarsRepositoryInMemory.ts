import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [] ;

    async create({ 
        name, 
        description, 
        daily_rate,
        license_plate,
        fine_amount,
        brand, 
        category_id,
        id
    }: ICreateCarDTO): Promise<Car> {

        const car = new Car();

        Object.assign(car, { 
            name, 
            description, 
            daily_rate,
            license_plate,
            fine_amount,
            brand, 
            category_id,
            id
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(car => car.license_plate === license_plate);
        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const all = this.cars.filter( (car) => 
        {
            if(car.available === true ||
                ((brand && car.brand === brand) || 
                (category_id && car.category_id === category_id) || 
                (name && car.name === name))
            ){
                return car;
            }
            return null;
        });

        return all;
    }

    async findById(car_id: string): Promise<Car> {
        const car = this.cars.find(car => car.id === car_id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex(car => car.id === id);
        this.cars[findIndex].available = available;
    }


}

export { CarsRepositoryInMemory };