import { prismaC } from "../prisma";

export async function buscarChegada(saida: string, horarioSaida: string, busca_final: string) {
    let rotas = await prismaC.route.findMany({
        where: { saida, horarioSaida }
    })
    let resultadoFinal;
    resultadoFinal = 0
    // console.log(saida, horarioSaida)
    // console.log(rotas)
    let rotasCorretas;
    let rotasEncontradas
    rotas = Array(rotas)[0]
    if (rotas.length == 1) {
        if (rotas[0].chegada == busca_final) {
            console.log("Alguma coisa aconteceu busca final")
            return [rotas[0]]
        }
    }
    
    for (let i = 0; i < rotas.length; i++) {
        if (rotas[i].chegada == busca_final) {
            console.log("Encontrou rota dentro do for")
            resultadoFinal = [rotas[i]]
        }
        rotasCorretas = []
        rotasCorretas.push(rotas[i])
        rotasEncontradas = await buscarChegada(rotas[i].chegada, rotas[i].horarioChegada, busca_final)
        console.log("teste")
        console.log(rotasEncontradas, typeof(rotasEncontradas), saida, rotas[i])
        if (rotasEncontradas==0){
            continue
        }
        rotasEncontradas.forEach(rotaEncontrada => {
            rotasCorretas.push(rotaEncontrada)
            if (rotasCorretas[rotasCorretas.length-1].chegada==busca_final){
                console.log("O que foi retornado: ", rotasCorretas, horarioSaida)
                resultadoFinal = rotasCorretas
            }
            
        });
    }
    console.log("Não encontrou"+saida, horarioSaida)
    return resultadoFinal;
}