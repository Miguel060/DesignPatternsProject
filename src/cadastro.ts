// cadastro.ts
const form = document.querySelector(".form_cadastro") as HTMLFormElement;
const paisSelect = document.getElementById("pais") as HTMLSelectElement;
const hotelSelect = document.getElementById("hotel") as HTMLSelectElement;
const pessoasInput = document.getElementById("pessoas") as HTMLInputElement;
const btnCalcular = document.querySelector(".btn_calcular") as HTMLButtonElement;
const precoTotal = document.getElementById("preco_total") as HTMLParagraphElement;
const btnAdicionar = document.getElementById("btn_add_viagem") as HTMLButtonElement;

const precosPorPais: Record<string, number> = {
  brasil: 2000,
  portugal: 3000,
  alemanha: 4000,
};

const hoteisPorPais: Record<string, string[]> = {
  brasil: ["Copacabana Palace", "Hotel Fasano", "Hotel Mahré"],
  portugal: ["Lisbon Historical", "GA Palace", "The Lumiares"],
  alemanha: ["schloss Lieser", "Vier jahrezeiten", "Villa Oriental"],
};

paisSelect.addEventListener("change", () => {
  const pais = paisSelect.value;
  hotelSelect.innerHTML = "<option value=''>Selecione um hotel</option>";

  hoteisPorPais[pais]?.forEach((hotel) => {
    const opt = document.createElement("option");
    opt.value = hotel;
    opt.textContent = hotel;
    hotelSelect.appendChild(opt);
  });
});

btnCalcular.addEventListener("click", (e) => {
  e.preventDefault();

  const pais = paisSelect.value;
  const pessoas = parseInt(pessoasInput.value);

  if (!pais || isNaN(pessoas) || pessoas <= 0) {
    precoTotal.textContent = "Preencha os dados corretamente.";
    return;
  }

  const precoPorPessoa = precosPorPais[pais] || 0;
  const total = precoPorPessoa * pessoas;

  precoTotal.textContent = `Preço total: R$ ${total.toFixed(2)}`;
});

btnAdicionar.addEventListener("click", async () => {
  const pais = (document.getElementById("pais") as HTMLSelectElement).value;
  const hotel = (document.getElementById("hotel") as HTMLSelectElement).value;
  const pessoas = parseInt((document.getElementById("pessoas") as HTMLInputElement).value);
  const dtviagem = new Date().toISOString(); 

  const body = { pais, hotel, pessoas, dtviagem };

  try {
    const res = await fetch("/api/paises/adicionar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    alert(data.message);
  } catch (err) {
    alert("Erro ao adicionar viagem.");
    console.error(err);
  }
});
