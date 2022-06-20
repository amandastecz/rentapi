import { Request, Response } from "express";
import { NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
};

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("Token missing");   
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "39505368546302be2704b3d53b24203c" ) as IPayload;
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);
        if(!user){
            throw new Error("User doesn't exists!");
            
        }
        next();
    } catch (error) {
        throw new Error("Token invalid!");
        
    }
}