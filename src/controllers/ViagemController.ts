import { Request, Response } from "express"
import { prismaC } from '../prisma';
import { buscarChegada, calculaPreco } from "../utils/viagens";
import { AppError } from "../errors/AppError";

export class ViagemController {
    public async list(request: Request, response: Response) {
        let { saida, chegada } = request.body;
        let rotas = await prismaC.route.findMany({
            where: {saida}
        })
        let viagensCompletas
        viagensCompletas = []
        let rotaTentativa
        rotas = Array(rotas)[0]
        // Transformar as rotas em um Array para poder ser usada no for
        for (let i = 0; i < rotas.length; i++){
            // Busca em todas as rotas que saem da saida
            rotaTentativa = await buscarChegada(rotas[i].chegada, rotas[i].horarioChegada, chegada)
            // É usada o buscarChegada para buscar as rotas
            if (rotaTentativa!=0){
                // Se a rota tiver sido encontrada
                rotaTentativa.unshift(rotas[i])
                // Adiciona a primeira rota
                viagensCompletas.push(rotaTentativa)
                // Adiciona no resultado
            }
            if (rotas[i].chegada==chegada) {
                viagensCompletas.push([rotas[i]])
                // Se foi encontrado usando apenas uma rota
            }
        }
        let preco;
        preco = []
        viagensCompletas.forEach(rotas => {
            preco.push(calculaPreco(rotas));
        });
        if (!viagensCompletas[0]){
            throw new AppError("Viagens not Found", 404);
        }
        return response.status(200).json({"viagens": viagensCompletas,"precos": preco});
    }
}