import { prismaC } from "../prisma";

export async function buscarChegada(saida: string, horarioSaida: string, buscaFinal: string) {
    let rotas = await prismaC.route.findMany({
        where: { saida, horarioSaida }
    })
    // Para o algoritmo não ficar muito grande se usa também como filro o horario de saida
    // para no mesmo momento que uma rota termina outra inicia
    let resultadoFinal;
    resultadoFinal = 0
    // Caso não seja encontrado um resultadoFinal por padrão será 0
    let rotasCorretas;
    // Rota com a buscaFinal
    let rotasEncontradas
    // Para o resultado da recursão
    rotas = Array(rotas)[0]
    if (rotas.length == 1) {
        if (rotas[0].chegada == buscaFinal) {
            // Se foi encontrado apenas uma rota e essa ser o resultado
            return [rotas[0]]
            // AS [ ] são para trabalhar recursivamente com os Array
        }
    }
    for (let i = 0; i < rotas.length; i++) {
        if (rotas[i].chegada == buscaFinal) {
            // Caso seja encontrado mais de uma rota
            resultadoFinal = [rotas[i]]
        }
        rotasCorretas = []
        rotasCorretas.push(rotas[i])
        rotasEncontradas = await buscarChegada(rotas[i].chegada, rotas[i].horarioChegada, buscaFinal)
        if (rotasEncontradas==0){
            continue
            // Se não foi encontrada nenhuma rota passa para o próximo laço do passo
        }
        rotasEncontradas.forEach(rotaEncontrada => {
            // Perrcorre as rotas encontradas
            rotasCorretas.push(rotaEncontrada)
            // Adiciona as rotas encontradas as rotas corretas
            if (rotasCorretas[rotasCorretas.length-1].chegada==buscaFinal){
                // Se foi encontrado o destino final pode retornar as rotas
                resultadoFinal = rotasCorretas
            }
        });
    }
    return resultadoFinal;
}