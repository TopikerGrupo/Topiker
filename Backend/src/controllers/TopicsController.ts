import {Request, Response} from "express"
import { prismaC } from '../prisma';
import { AppError } from "../errors/AppError";

export class TopicsController {
    public async list(_request: Request, response: Response){
        const topics = await prismaC.topic.findMany();
        response = response.status(200).json(topics);
    }
    public async show(request: Request, response: Response){
        const topicID = request.params.id;
        const topic = await prismaC.topic.findUnique({
            "where":{topicID}
        });
        if (!topic){
            throw new AppError("topic not Found", 404);
        }
        response = response.status(200).json(topic);
    }
    public async create(request:Request, response: Response){
        const {motoristaID, cobradorId, quantidadeAcentos} = request.body;
        const topic = await prismaC.topic.create({
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
        const topicExist = await prismaC.topic.findUnique({
            "where":{topicID}
        });
        if (!topicExist){
            throw new AppError("topic not Found", 404);
        }
        const {motoristaID, cobradorId, quantidadeAcentos} = request.body;
        const topic = await prismaC.topic.update({
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
        const topicExist = await prismaC.topic.findUnique({
            "where":{topicID}
        });
        if (!topicExist){
            throw new AppError("topic not Found", 404);
        }
        const user = await prismaC.topic.delete({
            "where":{topicID}
        });
        response = response.status(200).json({});
    }
}