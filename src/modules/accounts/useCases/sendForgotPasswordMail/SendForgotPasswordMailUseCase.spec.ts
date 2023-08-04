import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MainProvider/inMemory/MailProviderInMemory";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserTokensRepositoryInMemory } from "../../repositories/inMemory/UserTokensRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider:DayjsDateProvider;
let usersTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", ()=>{
    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProviderInMemory);
    });

    it("should be able to send forgot password mail to user", async ()=>{
        const sendMail = jest.spyOn(mailProviderInMemory,"sendMail");

        const user: ICreateUserDTO = {
            name: "Victoria Fletcher",
            email: "eci@aze.uk",
            password: "123456",
            driver_license: "2749218325"
        }
        await usersRepositoryInMemory.create(user);
        await sendForgotPasswordMailUseCase.execute(user.email);
        expect(sendMail).toHaveBeenCalled();
    })
})