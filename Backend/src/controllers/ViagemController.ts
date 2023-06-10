import { Request, Response } from "express"
import { prismaC } from '../prisma';
import { buscarChegada } from "../classes/viagens";

export class ViagemController {
    public async show(request: Request, response: Response) {
        const userID = request.params.id;
        let { saida, chegada } = request.body;
        let rotas = await prismaC.route.findMany({
            where: {saida}
        })
        let rotasCompletas
        rotasCompletas = []
        let rotaTentativa
        rotas = Array(rotas)[0]
        for (let i = 0; i < rotas.length; i++){
            rotaTentativa = await buscarChegada(rotas[i].chegada, rotas[i].horarioChegada, chegada)
            if (rotaTentativa!=0){
                rotaTentativa.unshift(rotas[i])
                rotasCompletas.push(rotaTentativa)
            }
            if (rotas[i].chegada==chegada) {
                rotasCompletas.push([rotas[i]])
            }
        }
        return response.status(200).json(rotasCompletas);
    }
    
}