

$(document).ready(function(){

    new WOW().init();

    $('#navbar-toggler').click(function(){
        $('.navbar-collapse').slideToggle(400);
    });

    $(window).scroll(function(){
        let pos = $(window).scrollTop();
        if(pos >= 100){
            $('.navbar').addClass('cng-navbar');
        } else {
            $('.navbar').removeClass('cng-navbar');
        }
    });

    //equipe
    $('.team .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        dots: true,
        nav: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1
            }, 
            600:{
                items: 2
            },
            1000:{
                items: 3
            }
        }
    });

});

const buscar_rota = document.querySelector(".b-busca");
const inverter = document.querySelector(".inverter")
inverter.addEventListener("click", function (e){
    e.preventDefault();
    let input_origem = document.querySelector(".origem")
    let input_destino = document.querySelector(".destino")
    let origem = input_origem.value;
    let destino = input_destino.value;
    input_destino.value = origem;
    input_origem.value = destino;

})
buscar_rota.addEventListener("click", function (e){
    e.preventDefault();
    const input_origem = document.querySelector(".origem").value;

    const input_destino = document.querySelector(".destino").value;
    const ajax = new XMLHttpRequest();
    ajax.open('GET', 'topics.json');
    ajax.send();
    ajax.onload = ()=>{
        let json = JSON.parse(ajax.response);
        json = seleciona_topics(json, input_destino, input_origem);
        monta_hmtl(json);
    }
});




function monta_hmtl(json){
    for(let i = 0; i < json.length; i++){
        //container
        let body = document.querySelector("body");
        let container = document.createElement("div");
        container.setAttribute("class", "container-consulta");
        body.appendChild(container-consulta);
        //sessao esq
        let sessao_esq = document.createElement("section");
        sessao_esq.setAttribute("class", "esquerda");
        container.appendChild(sessao_esq);
        //sessao rota
        let sessao_rota = document.createElement("section");
        sessao_rota.setAttribute("class", "rota");
        sessao_esq.appendChild(sessao_rota);
        //div cooperativa
        let cooperativa = document.createElement("div");
        cooperativa.setAttribute("class", "cooperativa");
        sessao_rota.appendChild(cooperativa);
        cooperativa.innerHTML = `${(json[i])['coperativa']}`;
        //div ponto de partida
        let ponto_part = document.createElement("div");
        ponto_part.setAttribute("class", "ponto-de-saida");
        sessao_rota.appendChild(ponto_part);
        // icone de localizacao
        let icone1 = document.createElement("i");
        icone1.setAttribute("class", "fa-solid fa-location-dot");
        ponto_part.appendChild(icone1);
        ponto_part.innerHTML += `${(json[i])['saida']}`;
        // div ponto de chegada
        let ponto_cheg = document.createElement("div");
        ponto_cheg.setAttribute("class", "ponto-de-chegada");
        sessao_rota.appendChild(ponto_cheg);
        ponto_cheg.appendChild(icone1);
        ponto_cheg.innerHTML += `${(json[i])['Chegada']}`;
        // div hora-de-saida
        let hora_saida = document.createElement("div");
        hora_saida.setAttribute("class", "hora-de-saida");
        sessao_rota.appendChild(hora_saida);
        // icone de localizacao
        let icone2 = document.createElement("i");
        icone2.setAttribute("class", "fa-solid fa-clock");
        hora_saida.appendChild(icone2);
        hora_saida.innerHTML += `${(json[i])['horario_saida']}`;
        // div hora-de-saida
        let hora_cheg = document.createElement("div");
        hora_cheg.setAttribute("class", "hora-de-chegada");
        sessao_rota.appendChild(hora_cheg);
        hora_cheg.appendChild(icone2);
        hora_cheg.innerHTML += `${(json[i])['horario_chegada']}`;
        // sessao checkbox
        let sessao_checkbox = document.createElement("section");
        sessao_checkbox.setAttribute("class", "checkbox");
        sessao_esq.appendChild(sessao_checkbox);
        // div caixa-de-selecao
        let caixas_sel= document.createElement("div");
        caixas_sel.setAttribute("id", "caixas-de-selecao");
        sessao_checkbox.appendChild(caixas_sel);
        // divs das caixa-de-selecao
        let div_check1= document.createElement("div");
        caixas_sel.appendChild(div_check1);
        let checkbox1= document.createElement("input");
        checkbox1.setAttribute("class", "btn");
        checkbox1.setAttribute("type", "checkbox");
        div_check1.appendChild(checkbox1);
        div_check1.innerHTML += ` Passageiro a partir de <b>R$ ${(json[i])['preco_passageiro']}</b>`;
        caixas_sel.innerHTML += "<br>";
        let div_check2= document.createElement("div");
        caixas_sel.appendChild(div_check2);
        let checkbox2= document.createElement("input");
        checkbox2.setAttribute("class", "btn");
        checkbox2.setAttribute("type", "checkbox");
        div_check2.appendChild(checkbox2);
        div_check2.innerHTML += ` Carga a partir de <b>R$ ${(json[i])['preco_carga']}</b>`;
        // sessao paradas
        let sessao_paradas = document.createElement("section");
        sessao_paradas.setAttribute("class", "paradas");
        sessao_esq.appendChild(sessao_paradas);
        // div btn
        let div_btn= document.createElement("div");
        div_btn.setAttribute("class", "btn");
        sessao_paradas.appendChild(div_btn);
        let icone3 = document.createElement("i");
        icone3.setAttribute("class", "fa-solid fa-map-location-dot");
        div_btn.appendChild(icone3);
        let ancora_ponto_parada = document.createElement("a");
        ancora_ponto_parada.setAttribute("href", "");
        ancora_ponto_parada.innerHTML = "<b>PONTOS DE PARADA</b>";
        div_btn.appendChild(ancora_ponto_parada);
        //sessao direita
        let sessao_dir = document.createElement("section");
        sessao_dir.setAttribute("class", "direita");
        container.appendChild(sessao_dir);
        // div secao compra
        let div_compra= document.createElement("div");
        div_compra.setAttribute("id", "secao-compra");
        sessao_dir.appendChild(div_compra);
        // botao compra
        let botao_comprar= document.createElement("button");
        botao_comprar.setAttribute("class", "b-compra");
        botao_comprar.innerHTML = "COMPRAR";
        div_compra.appendChild(botao_comprar);
        div_compra.innerHTML += `<div><b>${(json[i])['vagas']} VAGAS</b></div>`;
    }
    
}

function seleciona_topics(json, destino, origem){
    let json2 = [];
    json.forEach((atual, i) => {
        if(json[i]['saida'].toUpperCase().trim() == origem.toUpperCase().trim() && json[i]['Chegada'].toUpperCase().trim() == destino.toUpperCase().trim())
            json2.push(atual);
    });
    return json2;
}
