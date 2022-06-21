import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user:{
        name: string,
        email: string
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){};

    async execute({email, password}: IRequest): Promise<IResponse>{
        //Usuário existe?
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError("Email or password incorrect!");            
        }

        //Senha está correta?
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");   
        }

        //Caso e-mail e senha ok, pode gerar JsonWebToken (JWT)
        const token = sign({}, "39505368546302be2704b3d53b24203c", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn:IResponse = {
            token, 
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return tokenReturn;

    }
}

export {AuthenticateUserUseCase};