import {Request, Response} from "express"
import { prismaC } from '../prisma';

export class UsersController {
    public async list(_request: Request, response: Response){
        const users = await prismaC.user.findMany();
        response = response.status(200).json(users);
    }
    public async show(request: Request, response: Response){
        const userID = request.params.id;
        const user = await prismaC.user.findUnique({
            "where":{userID}
        });
        response = response.status(200).json(user);
    }
    public async create(request:Request, response: Response){
        const {name, email, cpf, status, password} = request.body;
        const user = await prismaC.user.create({
           data: {
               email,
               password,
               cpf,
               name,
               status
           },
        });
        return response.status(200).json(user);
    }
    public async update(request:Request, response: Response){
        const userID = request.params.id;
        const {name, email, cpf, status, password} = request.body;
        const user = await prismaC.user.update({
           where:{userID},
           data: {
               email,
               password,
               cpf,
               name,
               status
           },
        });
        return response.status(200).json(user);
    }
    public async delete(request: Request, response: Response){
        const userID = request.params.id;
        const user = await prismaC.user.delete({
            "where":{userID}
        });
        response = response.status(200).json({});
    }
     
}