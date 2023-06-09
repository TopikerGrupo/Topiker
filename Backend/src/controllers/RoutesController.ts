import {PrismaClient} from '@prisma/client'
import {Request, Response} from "express"

export class RoutesController {
    public async list(_request: Request, response: Response){
        const prisma = new PrismaClient();
        const routes = await prisma.route.findMany();
        response = response.status(200).json(routes);
    }
    public async show(request: Request, response: Response){
        const routeID = request.params.id;
        const prisma = new PrismaClient();
        const routes = await prisma.route.findUnique({
            "where":{routeID}
        });
        response = response.status(200).json(routes);
    }
    public async create(request:Request, response: Response){
        const {horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados} = request.body;
        const prisma = new PrismaClient();
        const route = await prisma.route.create({
           data: {
            horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados
           },
        });
        return response.status(200).json(route);
    }
    public async update(request:Request, response: Response){
        const routeID = request.params.id;
        const {horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados} = request.body;
        const prisma = new PrismaClient();
        const route = await prisma.route.update({
           where:{routeID},
           data: {
            horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados
           },
        });
        return response.status(200).json(route);
    }
    public async delete(request: Request, response: Response){
        const routeID = request.params.id;
        const prisma = new PrismaClient();
        const user = await prisma.route.delete({
            "where":{routeID}
        });
        response = response.status(200).json({});
    }
}