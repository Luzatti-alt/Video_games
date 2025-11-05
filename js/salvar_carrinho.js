document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão de carrinho dentro do primeiro bloco de compra na página
    const botaoCarrinho = document.querySelector('.compras-sobre .comprar:first-child button');
    
    if (botaoCarrinho) {
        botaoCarrinho.addEventListener('click', () => {
            let nomeJogo = document.title.trim(); 
            
            // Se o título não for o nome real do jogo (como parece ser o caso)
            if (nomeJogo === 'deltarune' || nomeJogo === 'carrinho paralel') {
                 // Tenta pegar o nome do jogo do ALT da imagem principal
                 const imagemTopo = document.querySelector('.informacao #topo_imagem');
                 nomeJogo = imagemTopo ? imagemTopo.getAttribute('alt').trim() : 'Jogo Desconhecido';
            }

            //Coleta Preço
            const precoContainer = document.querySelector('.compras-sobre .comprar:first-child .new-price');
            const precoStr = precoContainer ? precoContainer.textContent.replace('R$', '').replace(',', '.').trim() : '0.00';
            const preco = parseFloat(precoStr);

            //Coleta Imagem (A primeira imagem principal)
            const imagemElement = document.querySelector('.main-media #slide');
            const imagemSrc = imagemElement ? imagemElement.getAttribute('src') : 'imagens/default.jpg';
            
            if (preco > 0 && nomeJogo !== 'Jogo Desconhecido') {
                // Chama a função global de salvamento
                // Nota: a variável `plataformas` não está definida, o padrão será ["windows"]
                adicionarAoCarrinho(nomeJogo, preco, imagemSrc,); 
            } else {
                alert(`Erro ao adicionar: Nome do Jogo não encontrado ou Preço inválido. Nome: ${nomeJogo}, Preço: ${preco}`);
            }
        });
    }
});
function getCarrinho() {
    const carrinhoJson = localStorage.getItem('jogosNoCarrinho');
    // Retorna o array parseado ou um array vazio se não houver nada
    return carrinhoJson ? JSON.parse(carrinhoJson) : [];
}
function salvarCarrinho(carrinho) {
    localStorage.setItem('jogosNoCarrinho', JSON.stringify(carrinho));
}
function adicionarAoCarrinho(nome, preco, imagem, plataformas) {
    const carrinhoAtual = getCarrinho();
    //push é um metodo de array
    carrinhoAtual.push({ 
        nome: nome, 
        preco: preco, 
        imagem: imagem, 
        plataformas: plataformas || ["windows"] 
    });

    salvarCarrinho(carrinhoAtual);
    alert(`"${nome}" adicionado ao carrinho!`);
    console.log(`"${nome}" adicionado ao carrinho!`);
    console.log(`"${nome}" adicionado ao carrinho!`);
}

function limparCarrinhoStorage() {
    localStorage.removeItem('jogosNoCarrinho');
}