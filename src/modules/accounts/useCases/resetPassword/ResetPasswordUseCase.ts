import { inject, injectable } from "tsyringe";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";

@injectable()
class ResetPasswordUseCase{
    constructor(
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ){}

    async execute({token, password}: IRequest): Promise<void>{
        const userToken = await this.userTokensRepository.findByRefreshToken(token);
        if(!userToken) throw new AppError("Token invalid!");
        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) throw new AppError("Token expired!");
        const user = await this.usersRepository.findById(userToken.user_id);
        user.password = await hash(password, 8);
        await this.usersRepository.create(user);
        await this.userTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUseCase }

interface IRequest{
    token: string, 
    password: string
}