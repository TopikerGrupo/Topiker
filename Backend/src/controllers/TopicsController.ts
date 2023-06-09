import {PrismaClient} from '@prisma/client'
import {Request, Response} from "express"

export class TopicsController {
    public async list(_request: Request, response: Response){
        const prisma = new PrismaClient();
        const topics = await prisma.topic.findMany();
        response = response.status(200).json(topics);
    }
    public async show(request: Request, response: Response){
        const topicID = request.params.id;
        const prisma = new PrismaClient();
        const topic = await prisma.topic.findUnique({
            "where":{topicID}
        });
        response = response.status(200).json(topic);
    }
    public async create(request:Request, response: Response){
        const {motoristaID, cobradorId, quantidadeAcentos} = request.body;
        const prisma = new PrismaClient();
        const topic = await prisma.topic.create({
           data: {
            motoristaID, 
            cobradorId, 
            quantidadeAcentos
           },
        });
        return response.status(200).json(topic);
    }
    public async update(request:Request, response: Response){
        const topicID = request.params.id;
        const {motoristaID, cobradorId, quantidadeAcentos} = request.body;
        const prisma = new PrismaClient();
        const topic = await prisma.topic.update({
           where:{topicID},
           data: {
            motoristaID, 
            cobradorId, 
            quantidadeAcentos
           },
        });
        return response.status(200).json(topic);
    }
    public async delete(request: Request, response: Response){
        const topicID = request.params.id;
        const prisma = new PrismaClient();
        const user = await prisma.topic.delete({
            "where":{topicID}
        });
        response = response.status(200).json({});
    }
}