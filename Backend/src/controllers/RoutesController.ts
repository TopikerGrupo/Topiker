import {Request, Response} from "express"
import { prismaC } from '../prisma';

export class RoutesController {
    public async list(_request: Request, response: Response){
        const routes = await prismaC.route.findMany();
        response = response.status(200).json(routes);
    }
    public async show(request: Request, response: Response){
        const routeID = request.params.id;
        const routes = await prismaC.route.findUnique({
            "where":{routeID}
        });
        response = response.status(200).json(routes);
    }
    public async create(request:Request, response: Response){
        const {horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados} = request.body;
        const route = await prismaC.route.create({
           data: {
            horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados
           },
        });
        return response.status(200).json(route);
    }
    public async update(request:Request, response: Response){
        const routeID = request.params.id;
        const {horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados} = request.body;
        const route = await prismaC.route.update({
           where:{routeID},
           data: {
            horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados
           },
        });
        return response.status(200).json(route);
    }
    public async delete(request: Request, response: Response){
        const routeID = request.params.id;
        const user = await prismaC.route.delete({
            "where":{routeID}
        });
        response = response.status(200).json({});
    }
}