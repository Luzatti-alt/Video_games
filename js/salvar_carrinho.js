document.addEventListener('DOMContentLoaded', () => {
        // Seleciona o botão de carrinho dentro do primeiro bloco de compra na página
        const botaoCarrinho = document.querySelector('.compras-sobre .comprar:first-child button');
        
        if (botaoCarrinho) {
            botaoCarrinho.addEventListener('click', () => {
                let nomeJogo = document.title.trim(); 
                
                if (!nomeJogo || nomeJogo === 'carrinho paralel') {
                     const h1 = document.querySelector('.principal_info h1');
                     nomeJogo = h1 ? h1.textContent.trim() : 'Jogo Desconhecido';
                }

                //Coleta Preço
                const precoContainer = document.querySelector('.compras-sobre .comprar:first-child .new-price');
                const precoStr = precoContainer ? precoContainer.textContent.replace('R$', '').replace(',', '.').trim() : '0.00';
                const preco = parseFloat(precoStr);

                //Coleta Imagem (A primeira imagem principal)
                const imagemElement = document.querySelector('.main-media #slide');
                const imagemSrc = imagemElement ? imagemElement.getAttribute('src') : 'imagens/default.jpg';
                
                const tags = document.querySelectorAll('.tags p');
                const plataformas = Array.from(tags).map(p => p.textContent.toLowerCase().replace(/[^a-z0-9]/g, ''));

                if (preco > 0 && nomeJogo !== 'Jogo Desconhecido') {
                    // Chama a função global de salvamento
                    adicionarAoCarrinho(nomeJogo, preco, imagemSrc, plataformas);
                } else {
                    alert(`Erro ao adicionar: Nome do Jogo não encontrado ou Preço inválido.`);
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
}

function limparCarrinhoStorage() {
    localStorage.removeItem('jogosNoCarrinho');
}