import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUser: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUser: CreateUserUseCase;

describe("Authenticate User", ()=>{

    beforeEach(() =>{
        userRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUser = new AuthenticateUserUseCase(userRepositoryInMemory);
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
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "B",
                email: "false@user.com",
                password: "123456",
                name: "False User Test"
            }
    
            await authenticateUser.execute({
                email: user.email,
                password: user.password
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate a user with wrong password", async () =>{
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "B",
                email: "true@user.com",
                password: "123456",
                name: "True User Test"
            }
    
            await createUser.execute(user);
    
            await authenticateUser.execute({
                email: user.email,
                password: "wrong"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})