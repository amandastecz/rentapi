import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MainProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMainProvider")
        private mailProvider: IMailProvider
    ){}

    async execute(email: string){
        const user = await this.usersRepository.findByEmail(email);
        if(!user) throw new AppError('User does not exists!');
        const token = uuidv4();
        const expires_date = this.dateProvider.addHours(3);
        await this.userTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        });
        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            `O link para o reset é ${token}`
        )
    }
}

export {SendForgotPasswordMailUseCase } 