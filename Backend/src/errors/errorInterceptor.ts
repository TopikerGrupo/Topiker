import { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';

export function errorInterceptor(error: Error, request: Request, response: Response, next: NextFunction){
    if(error instanceof AppError){
        response.status(error.statusCode).json({
            status: 'Error',
            message: error.message,
        })
    }
    return response.status(500).json({
        status: 'Error',
        message: 'Internal Sever Error'
    })

}