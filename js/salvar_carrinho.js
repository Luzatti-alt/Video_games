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