const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let total = 0;
async function carregarPaises() {
    try {
        const res = await fetch("http://localhost:3000/api/paises");
        const paises = await res.json();
        total = paises.length;
        paises.forEach((pais) => {
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `
                <img src="${pais.img}" alt="${pais.nmpais}" />
                <p>${pais.nmpais}</p>            
            `;
            slider.appendChild(card);
        });
    }
    catch (err) {
        console.log('Erro ao carregar países:', err);
    }
}
carregarPaises();
export {};
