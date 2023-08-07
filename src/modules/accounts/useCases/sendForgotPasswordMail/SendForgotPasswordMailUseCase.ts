import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";
import 'dotenv/config';
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
        @inject("MailProvider")
        private mailProvider: IMailProvider
    ){}

    async execute(email: string){
        const user = await this.usersRepository.findByEmail(email);
        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs")
        if(!user) throw new AppError('User does not exists!');
        const token = uuidv4();
        const expires_date = this.dateProvider.addHours(3);
        await this.userTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        });
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_EMAIL_URL}${token}`
        };
        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        )
    }
}

export {SendForgotPasswordMailUseCase } 