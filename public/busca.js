"use strict";
const inputBusca = document.getElementById('inputBusca');
const btnBusca = document.getElementById('btnBusca');
const divResultados = document.getElementById('buscaViagens');
btnBusca.addEventListener('click', async (e) => {
    e.preventDefault();
    const nome = inputBusca.value.trim();
    if (!nome)
        return alert("Digite o nome de um país.");
    try {
        const res = await fetch(`/api/paises/buscar?nome=${encodeURIComponent(nome)}`);
        const viagens = await res.json();
        console.log(viagens);
        divResultados.innerHTML = "";
        if (viagens.length === 0) {
            divResultados.innerHTML = "<p>Nenhuma viagem encontrada.</p>";
            return;
        }
        viagens.forEach((viagem) => {
            const card = document.createElement('div');
            card.className = "cardViagem";
            card.innerHTML = `
        <img src="${viagem.img}" alt="${viagem.nmpais}" />
        <p class="cardName">${viagem.nmpais}</p>
        <p>${viagem.vlviagem} pessoas</p>
        <p>${viagem.dtviagem}</p>
        <button class="btn_remover" data-id="${viagem.idviagem}">DEL</button>
      `;
            const btnRemover = card.querySelector('.btn_remover');
            btnRemover.addEventListener('click', async () => {
                if (confirm('Tem certeza que deseja remover esta viagem?')) {
                    try {
                        await fetch(`/api/paises/viagens/${viagem.idviagem}`, { method: 'DELETE' });
                        card.remove();
                        alert('Viagem removida com sucesso!');
                    }
                    catch (err) {
                        console.error("Erro ao remover viagem:", err);
                        alert('Erro ao remover viagem');
                    }
                }
            });
            divResultados.appendChild(card);
        });
    }
    catch (err) {
        console.error("Erro ao buscar viagens:", err);
        divResultados.innerHTML = "<p>Erro ao buscar viagens.</p>";
    }
});
