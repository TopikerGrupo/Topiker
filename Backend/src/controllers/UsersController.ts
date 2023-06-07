import {PrismaClient} from '@prisma/client'
import {Request, Response} from "express"

export class UsersController {
    public async list(_request: Request, response: Response){
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany();
        response = response.status(200).json(users);
    }
    public async show(request: Request, response: Response){
        const userID = request.params.id;
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            "where":{userID}
        });
        response = response.status(200).json(user);
    }
    public async create(request:Request, response: Response){
        const {name, email, cpf, status, password} = request.body;
        const prisma = new PrismaClient();
        const user = await prisma.user.create({
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
        const prisma = new PrismaClient();
        const user = await prisma.user.update({
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
        const prisma = new PrismaClient();
        const user = await prisma.user.delete({
            "where":{userID}
        });
        response = response.status(200).json({});
    }
     
}