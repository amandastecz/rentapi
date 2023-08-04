import { ICreateUserTokensDTO } from "../../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository{
    usersTokens: UserTokens[]=[];
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
        const userToken = new UserTokens();
        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id
        })
        this.usersTokens.push(userToken);

        return userToken;
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
       return this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token);
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find((ut) => ut.id === id)
        await this.usersTokens.splice(
            this.usersTokens.indexOf(userToken)
        )
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.usersTokens.find(ut => ut.refresh_token === refresh_token);
    }
}

export { UserTokensRepositoryInMemory }