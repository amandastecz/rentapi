import { Repository, getRepository } from "typeorm";
import { ICreateUserTokensDTO } from "../../../dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "../../../repositories/IUserTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository{
    private repository: Repository<UserTokens>;
    constructor(){
        this.repository = getRepository(UserTokens);
    }
    findById(user: string): Promise<UserTokens> {
        throw new Error("Method not implemented.");
    }
    
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
       const userTokens = await this.repository.create({ expires_date, refresh_token, user_id});
       await this.repository.save(userTokens);
       return userTokens;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        return await this.repository.findOne({
            user_id,
            refresh_token
        });
    }

    async deleteById(token_id: string): Promise<void> {
        await this.repository.delete(token_id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return await this.repository.findOne({
            refresh_token
        });
    }
}

export { UserTokensRepository }