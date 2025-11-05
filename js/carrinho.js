// js/carrinho.js

//exemplo com array(vou trocar para localstorage)
const jogosNoCarrinho = [
  {
    nome: "Dragon Ball: Sparking! Zero",
    imagem: "imagens/dbz.jfif",
    preco: 299.99,
    plataformas: ["windows", "linux", "apple"] 
  },
  {
    nome: "Hollow Knight: Silksong",
    imagem: "imagens/Capa-Silksong.jpg",
    preco: 60.50,
    plataformas: ["windows", "linux"]
  }
];
const containerCompras = document.querySelector(".carrinho > .compras"); // Seleciona a div .compras principal
const controleCompraEl = document.querySelector(".controle-compra"); // Seleciona o bloco de botões de controle
let total = 0;

// Cria dinamicamente os itens do carrinho
function renderCarrinho() {
  const lista = document.createElement("div");
  lista.id = "lista-jogos";
  lista.innerHTML = "";
  total = 0;

  // Se o carrinho estiver vazio, exibe uma mensagem
  if (jogosNoCarrinho.length === 0) {
    lista.innerHTML = '<h2 style="text-align: center; padding: 20px;">Seu carrinho está vazio.</h2>';
  } else {
    controleCompraEl.style.display = 'flex'; // Exibe os botões de controle
  }

  jogosNoCarrinho.forEach((jogo, index) => {
    total += jogo.preco;

    const jogoDiv = document.createElement("div");
    jogoDiv.classList.add("jogo");

    jogoDiv.innerHTML = `
      <div class="jogo_info">
        <img src="${jogo.imagem}" alt="${jogo.nome}">
        <div class="sobre_compra">
          <h1>${jogo.nome}</h1>
          <div class="plataformas">
            ${jogo.plataformas.map(p => `<img src="imagens/${p}.png" alt="${p}">`).join('')}
          </div>
          <select>
            <option value="para mim">para mim</option>
            <option value="presente">presente</option>
          </select>
        </div>
      <div class="preço">
        <h1>Preço:</h1>
        <h1>R$ ${jogo.preco.toFixed(2)}</h1>
        <div class="controle_carrinho">
          <button onclick="adicionar(${index})">adicionar</button>
          <button onclick="remover(${index})">remover</button>
        </div>
    </div>
    `;

    lista.appendChild(jogoDiv);
  });

  // Atualiza o total
  atualizarTotal();

  // 2. CORREÇÃO: Remove a lista antiga, depois insere a lista nova no início
  const jogosAntigos = document.getElementById("lista-jogos");
  if (jogosAntigos) jogosAntigos.remove();
  
  // Insere a nova lista ANTES do bloco de botões de controle
  containerCompras.insertBefore(lista, controleCompraEl);
}

// --- Funções de controle ---
function adicionar(index) {
  // Nota: Para um carrinho real, você precisaria adicionar uma lógica para aumentar a quantidade ou 
  // duplicar o item no array. Aqui, estamos apenas atualizando o total.
  alert(`Simulação: Adicionado mais 1 unidade de ${jogosNoCarrinho[index].nome}`);
  total += jogosNoCarrinho[index].preco;
  atualizarTotal();
}

function remover(index) {
  if (confirm(`Remover ${jogosNoCarrinho[index].nome} do carrinho?`)) {
    // Subtrai o preço antes de remover
    total -= jogosNoCarrinho[index].preco; 
    jogosNoCarrinho.splice(index, 1);
    renderCarrinho(); // Recarrega a lista
  }
}

function limparCarrinho() {
  if (confirm("Remover todos os itens do carrinho?")) {
    jogosNoCarrinho.length = 0;
    renderCarrinho();
  }
}

function atualizarTotal() {
  const totalContainer = document.querySelector(".total h1");
  totalContainer.innerText = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarCompra() {
  if (jogosNoCarrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert(`Compra de R$ ${total.toFixed(2)} finalizada com sucesso!`);
  limparCarrinho();
}

// Inicializa ao carregar a página
document.addEventListener("DOMContentLoaded", renderCarrinho);