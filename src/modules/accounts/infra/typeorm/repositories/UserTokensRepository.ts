import { Repository, getRepository } from "typeorm";
import { ICreateUserTokensDTO } from "../../../dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "../../../repositories/IUserTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository{
    private repository: Repository<UserTokens>;
    constructor(){
        this.repository = getRepository(UserTokens);
    }
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
       const userTokens = await this.repository.create({ expires_date, refresh_token, user_id});
       await this.repository.save(userTokens);
       return userTokens;
    }
}

export { UserTokensRepository }