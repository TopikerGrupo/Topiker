import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;
    if(!authHeader){
        return response.status(401).json({
            message: 'Token required',
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const {sub} = verify(token, 'chavesecreta');
        request.userId = sub as string;
        
        next();
    } catch (error) {
        throw new AppError('Token invalid', 401);
    }
}