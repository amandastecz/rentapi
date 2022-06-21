import { Request, Response } from "express";
import { NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
};

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing", 401);   
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "39505368546302be2704b3d53b24203c" ) as IPayload;
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);
        if(!user){
            throw new AppError("User doesn't exists!", 401);
            
        }
        next();
    } catch (error) {
        throw new AppError("Token invalid!", 401);
        
    }
}