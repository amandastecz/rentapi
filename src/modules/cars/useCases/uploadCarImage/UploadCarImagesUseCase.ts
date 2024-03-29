import { inject, injectable } from "tsyringe";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase{
    constructor(
        @inject("CarImagesRepository")
        private carsImagesRepository: ICarsImagesRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ){}

    async execute({
        car_id,
        images_name
    }: IRequest): Promise<void>{
        images_name.map(async (image) => {
            await this.carsImagesRepository.create(
                car_id,
                image
            );
            await this.storageProvider.save(image, "cars");
        })
    }
}

export { UploadCarImagesUseCase }