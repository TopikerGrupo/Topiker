import {Request, Response} from "express";
import { prismaC } from '../prisma';
import { AppError } from "../errors/AppError";
import Zod from 'zod';
import { compare, hash } from 'bcrypt';
import {sign} from 'jsonwebtoken';
export class AuthenticateController {
    public async create(request:Request, response: Response){
        const bodySchema = Zod.object({
            email: Zod.string().email(),
            password: Zod.string().min(6),
        }).strict();
        const {email, password} = bodySchema.parse(request.body);
        const user = await prismaC.user.findFirst({
            "where":{email}
        });

        if (!user){
            throw new AppError("Incorrect email or password", 401);
        }
        const passwordMath = await compare(password, user.password);
        if (!passwordMath){
            throw new AppError("Incorrect email or password", 401);
        }

        const token = sign({}, 'chavesecreta', {
            subject: user.userID,
            expiresIn: '1d',
        });
        
        return response.status(200).json(token);
    }
    
}