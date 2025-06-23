import { Pais } from "./src/models/Pais";

const slider = document.getElementById('slider') as HTMLDivElement;
const prevBtn = document.getElementById('prevBtn') as HTMLDivElement;
const nextBtn = document.getElementById('nextBtn') as HTMLDivElement;

let currentIndex = 0;
let total = 0;

async function carregarPaises() {
    try {
        const res = await fetch("http://localhost:3000/api/paises");
        const paises: Pais[] = await res.json();

        total = paises.length;

        paises.forEach((pais) => {
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `
                <img src="${pais.img}" alt="${pais.nmpais}" />
                <p class="cardName">${pais.nmpais}</p>            
            `;
            slider.appendChild(card);
        });
    } catch (err) {
        console.log('Erro ao carregar países:', err);
    }
}

carregarPaises();