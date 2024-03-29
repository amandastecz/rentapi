import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserTokensRepositoryInMemory } from "../../repositories/inMemory/UserTokensRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUser: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUser: CreateUserUseCase;

describe("Authenticate User", ()=>{

    beforeEach(() =>{
        userRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUser = new AuthenticateUserUseCase(userRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
        createUser = new CreateUserUseCase(userRepositoryInMemory);
    })

    it("Should be able to authenticate an user", async () =>{
        const user: ICreateUserDTO = {
            driver_license: "B",
            email: "user@stecz.com",
            password: "123456",
            name: "User Test"
        }

        await createUser.execute(user);
        const result = await authenticateUser.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate a nonexistent user", async () =>{
        const user: ICreateUserDTO = {
            driver_license: "B",
            email: "false@user.com",
            password: "123456",
            name: "False User Test"
        }
        await expect(
            authenticateUser.execute({
                email: user.email,
                password: user.password
            })).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("Should not be able to authenticate a user with wrong password", async () =>{
        const user: ICreateUserDTO = {
            driver_license: "B",
            email: "true@user.com",
            password: "123456",
            name: "True User Test"
        }
        await createUser.execute(user);
        await expect(authenticateUser.execute({
                email: user.email,
                password: "wrong"
            })).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
})