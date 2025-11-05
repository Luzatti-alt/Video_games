let jogosNoCarrinho = []; 
const containerCompras = document.querySelector(".carrinho > .compras");
const controleCompraEl = document.querySelector(".controle-compra");
let total = 0;

function renderCarrinho() {
  jogosNoCarrinho = getCarrinho(); // Função de salvar_carrinho.js
  
  const lista = document.createElement("div");
  lista.id = "lista-jogos";
  lista.innerHTML = "";
  total = 0;

  // Se o carrinho estiver vazio, exibe uma mensagem
  if (jogosNoCarrinho.length === 0) {
    lista.innerHTML = '<h2 style="text-align: center; padding: 20px;">Seu carrinho está vazio.</h2>';
    if (controleCompraEl) controleCompraEl.style.display = 'none';
  } else {
    if (controleCompraEl) controleCompraEl.style.display = 'flex'; // Exibe os botões de controle
  }

  jogosNoCarrinho.forEach((jogo, index) => {
    // Para renderizar o total correto
    const precoSeguro = typeof jogo.preco === 'number' && !isNaN(jogo.preco) ? jogo.preco : 0;
    total += precoSeguro;

    const jogoDiv = document.createElement("div");
    jogoDiv.classList.add("jogo");
    jogoDiv.innerHTML = `
      <div class="jogo_info">
        <img src="${jogo.imagem}" alt="${jogo.nome}">
        <div class="sobre_compra">
          <h1>${jogo.nome}</h1>
          <select>
            <option value="para mim">para mim</option>
            <option value="presente">presente</option>
          </select>
        </div>
      </div> <div class="preço">
        <h1>Preço:</h1>
        <h1>R$ ${precoSeguro.toFixed(2)}</h1>
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
  const jogosAntigos = document.getElementById("lista-jogos");
  if (jogosAntigos) jogosAntigos.remove();
  if (containerCompras && controleCompraEl) {
    containerCompras.insertBefore(lista, controleCompraEl);
  } else if (containerCompras) {
    containerCompras.appendChild(lista);
  }
}
function adicionar(index) {
  const itemDuplicado = { ...jogosNoCarrinho[index] };
  jogosNoCarrinho.push(itemDuplicado);
  salvarCarrinho(jogosNoCarrinho); 
  renderCarrinho(); // Recarrega do storage
}

function remover(index) {
  if (confirm(`Remover ${jogosNoCarrinho[index].nome} do carrinho?`)) {
    jogosNoCarrinho.splice(index, 1);
    salvarCarrinho(jogosNoCarrinho);
    renderCarrinho(); 
  }
}

function limparCarrinho() {
  if (confirm("Remover todos os itens do carrinho?")) {
    limparCarrinhoStorage();
    renderCarrinho();
  }
}

function atualizarTotal() {
  // Recalcula o total a partir do array atualizado (jogosNoCarrinho)
  const novoTotal = jogosNoCarrinho.reduce((acc, jogo) => acc + jogo.preco, 0);
  
  const totalContainer = document.querySelector(".total h1");
  if (totalContainer) {
    totalContainer.innerText = `Total: R$ ${novoTotal.toFixed(2)}`;
  }
}

function finalizarCompra() {
  if (jogosNoCarrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  const valorFinal = jogosNoCarrinho.reduce((acc, jogo) => acc + jogo.preco, 0);
  alert(`Compra de R$ ${valorFinal.toFixed(2)} finalizada com sucesso!`);
  limparCarrinho();
}

// Inicializa ao carregar a página
document.addEventListener("DOMContentLoaded", renderCarrinho);