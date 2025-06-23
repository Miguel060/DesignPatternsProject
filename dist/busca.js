"use strict";
const inputBusca = document.getElementById('inputBusca');
const btnBusca = document.getElementById('btnBusca');
const divResultados = document.getElementById('buscaViagens');
console.log("Script de busca carregado");
console.log("inputBusca", inputBusca);
console.log("btnBusca", btnBusca);
console.log("divResultados", divResultados);
btnBusca.addEventListener('click', async (e) => {
    e.preventDefault();
    const nome = inputBusca.value.trim();
    if (!nome)
        return alert("Digite o nome de um país.");
    try {
        const res = await fetch(`/api/paises/buscar?nome=${encodeURIComponent(nome)}`);
        const viagens = await res.json();
        console.log(viagens);
        divResultados.innerHTML = ""; // limpa resultados anteriores
        if (viagens.length === 0) {
            divResultados.innerHTML = "<p>Nenhuma viagem encontrada.</p>";
            return;
        }
        viagens.forEach((viagem) => {
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `
        <img src="${viagem.img}" alt="${viagem.nmpais}" />
        <p class="cardName">${viagem.nmpais}</p>
        <p>${viagem.vlviagem} pessoas</p>
        <p>${viagem.dtviagem}</p>
      `;
            divResultados.appendChild(card);
        });
    }
    catch (err) {
        console.error("Erro ao buscar viagens:", err);
        divResultados.innerHTML = "<p>Erro ao buscar viagens.</p>";
    }
});
