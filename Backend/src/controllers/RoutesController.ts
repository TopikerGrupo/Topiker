import {Request, Response} from "express"
import { prismaC } from '../prisma';
import { AppError } from "../errors/AppError";

export class RoutesController {
    public async list(_request: Request, response: Response){
        const routes = await prismaC.route.findMany();
        response = response.status(200).json(routes);
    }
    public async show(request: Request, response: Response){
        const routeID = request.params.id;
        const routes = await prismaC.route.findUnique({
            "where":{routeID},
            "include": {
                "passageiro": {
                  "select": {
                    "name": true,
                    "email": true,
                    "userID": true,
                    "status": true,
                    "cpf": true,
                  },
                },
              },
        });
        if (!routes){
            throw new AppError("route not Found", 404);
        }
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
        const {horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados, passageiroID} = request.body;
        const routeExist = await prismaC.route.findUnique({
            "where":{routeID}
        });
        if (!routeExist){
            throw new AppError("route not Found", 404);
        }
        const route = await prismaC.route.update({
           where:{routeID},
           data: {
            horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados,
            passageiro:{
                connect:{"userID": passageiroID}
            },
           },
        });
        return response.status(200).json(route);
    }
    public async delete(request: Request, response: Response){
        const routeID = request.params.id;
        const routes = await prismaC.route.findUnique({
            "where":{routeID}
        });
        if (!routes){
            throw new AppError("route not Found", 404);
        }
        const user = await prismaC.route.delete({
            "where":{routeID}
        });
        response = response.status(200).json({});
    }
}