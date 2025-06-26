const form = document.querySelector('.form_cadastro');
const precoTotalEl = document.getElementById('preco_total');
const btnAddViagem = document.getElementById('btn_add_viagem');
const paisSelect = document.getElementById('pais');
const hotelSelect = document.getElementById('hotel');
const pessoasInput = document.getElementById('pessoas');
const dataInput = document.getElementById('data');
let listaPaises = [];
async function carregarPaises() {
    try {
        const response = await fetch('/api/paises');
        const paises = await response.json();
        listaPaises = paises;
        paisSelect.innerHTML = '<option value="">Selecione um país</option>';
        paises.forEach((pais) => {
            const option = document.createElement('option');
            option.value = pais.idpais.toString();
            option.textContent = pais.nmpais;
            paisSelect.appendChild(option);
        });
    }
    catch (error) {
        console.error('Erro ao carregar países:', error);
        alert('Erro ao carregar lista de países');
    }
}
async function carregarHoteis(idpais) {
    hotelSelect.innerHTML = '<option value="">Selecione um hotel</option>';
    hotelSelect.disabled = true;
    if (!idpais)
        return;
    try {
        const response = await fetch(`/api/paises/hoteis/${idpais}`);
        const hoteis = await response.json();
        hoteis.forEach(hotel => {
            const option = document.createElement('option');
            option.value = hotel.idhotel.toString();
            option.textContent = `${hotel.nmhotel} (R$ ${hotel.vlhotel.toLocaleString()})`;
            hotelSelect.appendChild(option);
        });
        hotelSelect.disabled = false;
    }
    catch (error) {
        console.error('Erro ao carregar hotéis:', error);
        alert('Erro ao carregar lista de hotéis');
    }
}
function obterValorPaisSelecionado() {
    const paisId = paisSelect.value;
    const pais = listaPaises.find(p => p.idpais.toString() === paisId);
    return pais ? pais.vlpassagem : 0;
}
async function calcularPreco() {
    const vlpassagem = obterValorPaisSelecionado();
    const paisId = paisSelect.value;
    const hotelId = hotelSelect.value;
    const pessoas = parseInt(pessoasInput.value);
    if (!paisId || !hotelId || isNaN(pessoas) || pessoas < 1) {
        alert('Selecione o país, hotel e informe a quantidade de pessoas corretamente.');
        return;
    }
    try {
        const response = await fetch(`/api/paises/hoteis/${paisId}`);
        const hoteis = await response.json();
        const hotelSelecionado = hoteis.find(h => h.idhotel.toString() === hotelId);
        if (hotelSelecionado) {
            const precoTotal = (hotelSelecionado.vlhotel + vlpassagem) * pessoas;
            precoTotalEl.textContent = `Preço total: R$ ${precoTotal.toLocaleString()}`;
        }
    }
    catch (error) {
        console.error('Erro ao calcular preço:', error);
        alert('Erro ao calcular preço da viagem');
    }
}
async function adicionarViagem() {
    const paisId = paisSelect.value;
    const hotelId = hotelSelect.value;
    const pessoas = parseInt(pessoasInput.value);
    const data = dataInput.value;
    if (!paisId || !hotelId || isNaN(pessoas) || pessoas < 1 || !data) {
        alert('Preencha todos os campos corretamente.');
        return;
    }
    try {
        const responseHoteis = await fetch(`/api/paises/hoteis/${paisId}`);
        const hoteis = await responseHoteis.json();
        const hotelSelecionado = hoteis.find(h => h.idhotel.toString() === hotelId);
        if (!hotelSelecionado) {
            throw new Error('Hotel não encontrado');
        }
        const precoTotal = hotelSelecionado.vlhotel * pessoas;
        const response = await fetch('/api/paises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idpais: parseInt(paisId),
                idhotel: parseInt(hotelId),
                qntpessoas: pessoas,
                vlviagem: precoTotal,
                dtviagem: data
            })
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar viagem');
        }
        alert('Viagem adicionada com sucesso!');
        form.reset();
        precoTotalEl.textContent = '';
        hotelSelect.innerHTML = '<option value="">Selecione um hotel</option>';
        hotelSelect.disabled = true;
    }
    catch (error) {
        console.error('Erro ao adicionar viagem:', error);
        alert('Erro ao adicionar viagem. Verifique o console para detalhes.');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    carregarPaises();
});
paisSelect.addEventListener('change', (e) => {
    carregarHoteis(e.target.value);
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    calcularPreco();
});
btnAddViagem.addEventListener('click', () => {
    adicionarViagem();
});
paisSelect.addEventListener('change', (e) => {
    const vlpassagem = obterValorPaisSelecionado();
    if (vlpassagem > 0) {
        alert(`Valor da passagem correspondente a esse país: R$ ${vlpassagem.toLocaleString()}`);
    }
    carregarHoteis(e.target.value);
});
export {};
