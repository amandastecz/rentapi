import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
import { AppError } from "../../../../shared/errors/AppError";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

@injectable()
export default class RefreshTokenUseCase {
    constructor(
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}
    async execute(token: string): Promise<ITokenRespose>{
        const {secret_refresh_token, expires_in_refresh_token, expires_in_refresh_token_days, secret_token, expires_in_token} = auth
        const { email, sub }  = verify(token, secret_refresh_token) as IPayload;
        const user_id = sub;
        const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(user_id, token);
        if(!userToken){
            throw new AppError("Refresh Token does not exists!")
        }
        await this.userTokensRepository.deleteById(userToken.id);
        const expires_date = this.dateProvider.addDays(expires_in_refresh_token_days);
        const refresh_token = sign({email}, secret_refresh_token, {
            subject: user_id,
            expiresIn: expires_in_refresh_token
        })
        await this.userTokensRepository.create({
            user_id: user_id,
            expires_date,
            refresh_token
        });
        const newToken = sign({}, secret_token, {
            subject: user_id,
            expiresIn: expires_in_token
        });

        return {
            token: newToken,
            refresh_token
        };
    }
}

interface IPayload {
    sub: string,
    email: string
}

interface ITokenRespose {
    token: string,
    refresh_token: string
}