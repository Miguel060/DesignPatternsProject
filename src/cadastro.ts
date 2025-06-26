const form = document.querySelector('.form_cadastro') as HTMLFormElement;
const precoTotalEl = document.getElementById('preco_total') as HTMLParagraphElement;
const btnAddViagem = document.getElementById('btn_add_viagem') as HTMLButtonElement;
const paisSelect = document.getElementById('pais') as HTMLSelectElement;
const hotelSelect = document.getElementById('hotel') as HTMLSelectElement;
const pessoasInput = document.getElementById('pessoas') as HTMLInputElement;
const dataInput = document.getElementById('data') as HTMLInputElement;
import { Pais } from "./models/Pais";
let listaPaises: Pais[] = [];
interface Hotel {
  idhotel: number;
  nmhotel: string;
  vlhotel: number;
}

async function carregarPaises(): Promise<void> {
  try {
    const response = await fetch('/api/paises');
    const paises = await response.json();
    listaPaises = paises;
    paisSelect.innerHTML = '<option value="">Selecione um país</option>';
    paises.forEach((pais: { idpais: number, nmpais: string }) => {
      const option = document.createElement('option');
      option.value = pais.idpais.toString();
      option.textContent = pais.nmpais;
      paisSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar países:', error);
    alert('Erro ao carregar lista de países');
  }
}

async function carregarHoteis(idpais: string): Promise<void> {
  hotelSelect.innerHTML = '<option value="">Selecione um hotel</option>';
  hotelSelect.disabled = true;
  
  if (!idpais) return;

  try {
    const response = await fetch(`/api/paises/hoteis/${idpais}`);
    const hoteis: Hotel[] = await response.json();
    
    hoteis.forEach(hotel => {
      const option = document.createElement('option');
      option.value = hotel.idhotel.toString();
      option.textContent = `${hotel.nmhotel} (R$ ${hotel.vlhotel.toLocaleString()})`;
      hotelSelect.appendChild(option);
    });
    
    hotelSelect.disabled = false;
  } catch (error) {
    console.error('Erro ao carregar hotéis:', error);
    alert('Erro ao carregar lista de hotéis');
  }
}
function obterValorPaisSelecionado(): number {
  const paisId = paisSelect.value;
  const pais = listaPaises.find(p => p.idpais.toString() === paisId);
  return pais ? pais.vlpassagem : 0;
}
async function calcularPreco(): Promise<void> {
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
    const hoteis: Hotel[] = await response.json();
    const hotelSelecionado = hoteis.find(h => h.idhotel.toString() === hotelId);
    
    if (hotelSelecionado) {
      const precoTotal = (hotelSelecionado.vlhotel + vlpassagem) * pessoas;
      precoTotalEl.textContent = `Preço total: R$ ${precoTotal.toLocaleString()}`;
    }
  } catch (error) {
    console.error('Erro ao calcular preço:', error);
    alert('Erro ao calcular preço da viagem');
  }
}
async function adicionarViagem(): Promise<void> {
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
    const hoteis: Hotel[] = await responseHoteis.json();
    const hotelSelecionado = hoteis.find(h => h.idhotel.toString() === hotelId);
    
    if (!hotelSelecionado) {
      throw new Error('Hotel não encontrado');
    }

    const precoTotal = hotelSelecionado.vlhotel * pessoas;

    const response = await fetch('/api/paises', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
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
  } catch (error) {
    console.error('Erro ao adicionar viagem:', error);
    alert('Erro ao adicionar viagem. Verifique o console para detalhes.');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  carregarPaises();
});

paisSelect.addEventListener('change', (e) => {
  carregarHoteis((e.target as HTMLSelectElement).value);
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
  carregarHoteis((e.target as HTMLSelectElement).value);
});