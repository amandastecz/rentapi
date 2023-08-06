import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../../infra/typeorm/entities/User";

@injectable()
class ProfileUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(id: string): Promise<User>{
        const user = await this.usersRepository.findById(id);
        return user;
    }
}

export { ProfileUserUseCase }