import {Request, Response} from "express"
import { prismaC } from '../prisma';
import { AppError } from "../errors/AppError";
import Zod from 'zod';
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
        const bodySchema = Zod.object({
            motoristaID: Zod.string(),
            cobradorId: Zod.string(),
            quantidadeAcentos: Zod.number().min(0),
        }).strict();
        const {motoristaID, cobradorId, quantidadeAcentos} = bodySchema.parse(request.body);
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
        const bodySchema = Zod.object({
            motoristaID: Zod.string().nullish(),
            cobradorId: Zod.string().nullish(),
            quantidadeAcentos: Zod.number().min(0).nullish(),
        }).strict();
        const {motoristaID, cobradorId, quantidadeAcentos} = bodySchema.parse(request.body);
        let data= {}
        if(motoristaID) data = {motoristaID};
        if(cobradorId) data = {...data, cobradorId};
        if(quantidadeAcentos) data = {...data, quantidadeAcentos};
        const topic = await prismaC.topic.update({
           where:{topicID},
           data,
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