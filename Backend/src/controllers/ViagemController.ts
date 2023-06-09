import {Request, Response} from "express"
import { prismaC } from '../prisma';

export class ViagemController {
    public async show(request: Request, response: Response){
        const topicID = request.params.id;
        const topic = await prismaC.topic.findUnique({
            "where":{topicID}
        });
        response = response.status(200).json(topic);
    }
    
}