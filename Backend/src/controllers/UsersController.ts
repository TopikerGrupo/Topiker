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
    // public async create(request:Request, response: Response){
    //     const name = request.body.name;
    //     const email = request.body.email;
    //     const cpf = request.body.cpf;
    //     const status = request.body.status;
    //     const prisma = new PrismaClient();
    //     const users = await prisma.user.create({
    //         "data":{
    //             name,
    //             email,
    //             cpf,
    //             status
    //         }
    //     })
    // }
}