import { inject } from "tsyringe";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { Rental } from "../../infra/typeorm/entities/Rental";

interface IRequest {
    id: string;
    user_id: string;
}

class DevolutionRentalUseCase {

    constructor(
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
    ){}

    async execute({ id }: IRequest): Promise<Rental>{
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const minimun_daily = 1;
        
        if(!rental){
            throw new AppError("Rental does not exists!");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
        );

        if(daily <= 0){
            daily = minimun_daily;
        };

        const delay = this.dateProvider.compareInDays(
            dateNow, 
            rental.expected_return_date
        );

        let total = 0;

        if(delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        this.rentalsRepository.create(rental);
        this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase }