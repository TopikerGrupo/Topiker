import {Request, Response} from "express"
import { prismaC } from '../prisma';
import { AppError } from "../errors/AppError";
import Zod from 'zod';

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
        const bodySchema = Zod.object({
            horarioSaida: Zod.string(),
            horarioChegada: Zod.string(),
            saida: Zod.string(),
            chegada: Zod.string(),
            distanciaKm: Zod.number(),
            PrecoPassageiro: Zod.number(),
            PrecoCarga: Zod.number(),
            IDTopic: Zod.string(),
            quantAcentosOcupados: Zod.number(),
        }).strict();
        const {horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados} = bodySchema.parse(request.body);
        const route = await prismaC.route.create({
           data: {
            horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados
           },
        });
        return response.status(200).json(route);
    }
    public async update(request:Request, response: Response){
        const routeID = request.params.id;
        const routeExist = await prismaC.route.findUnique({
            "where":{routeID}
        });
        if (!routeExist){
            throw new AppError("route not Found", 404);
        }
        const bodySchema = Zod.object({
            horarioSaida: Zod.string().nullish(),
            horarioChegada: Zod.string().nullish(),
            saida: Zod.string().nullish(),
            chegada: Zod.string().nullish(),
            distanciaKm: Zod.number().nullish(),
            PrecoPassageiro: Zod.number().nullish(),
            PrecoCarga: Zod.number().nullish(),
            IDTopic: Zod.string().nullish(),
            quantAcentosOcupados: Zod.number().nullish(),
            passageiroID: Zod.string().nullish(),
        }).strict();
        const {horarioSaida, horarioChegada, saida, chegada, distanciaKm, PrecoPassageiro, PrecoCarga, IDTopic, quantAcentosOcupados, passageiroID} = bodySchema.parse(request.body);
        let data= {}
        if(horarioSaida) data = {horarioSaida};
        if(horarioChegada) data = {...data, horarioChegada};
        if(saida) data = {...data, saida};
        if(distanciaKm) data = {...data, distanciaKm};
        if(PrecoPassageiro) data = {...data, PrecoPassageiro};
        if(PrecoCarga) data = {...data, PrecoCarga};
        if(IDTopic) data = {...data, IDTopic};
        if(quantAcentosOcupados) data = {...data, quantAcentosOcupados};
        let route
        if (passageiroID){
            data = {...data, passageiro:{
                connect:{"userID": passageiroID}
            }};
            route = await prismaC.route.update({
                where:{routeID},
                data,
            });
        }
        else{
             route = await prismaC.route.update({
                where:{routeID},
                data,
             });
        }
        
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