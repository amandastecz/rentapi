import { CreateCarUseCase } from "./CreateCarUseCase"

let createCar: CreateCarUseCase;

describe("Create Car", () => {

    beforeEach(() => {
        createCar = new CreateCarUseCase();
    })

    it("should be able to create a new car", async () => {
        await createCar.execute();
    })
})