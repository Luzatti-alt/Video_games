const adquirirDemo = document.getElementById('adquirir_demo');
const comprarJogoBase = document.getElementById('comprar_jogo_base');
const comprarPack = document.getElementById('comprar_pack');
const comprarEdicao = document.getElementById('comprar_edicao');
const comprarDlc = document.getElementById('comprar_dlc');
const denunciar = document.getElementById('denunciar_but');
const pesquisa = document.getElementById('pesquisar');
//carrosel
let indice = 0;
let slide = document.getElementById("slide");
let imagens = ["imagens/gtavi.jfif","imagens/dbz.jfif","imagens/dbz.jfif","imagens/silksong-full.jfif","imagens/subnautica.jfif","imagens/terra.jfif"];
setInterval(() => {
    if (indice >= imagens.length) {
        indice = 0; // Reinicia o índice para 0 quando chega ao final do array
    }
    slide.src = imagens[indice];
    indice++; // Incrementa o índice para a próxima imagem
}, 3000);

//eventos dos botões
pesquisa.addEventListener('click', () => {
    alert('Pesquisar');
});
adquirirDemo.addEventListener('click', () => {
    alert('Comprou Demo');
});
comprarJogoBase.addEventListener('click', () => {
    alert('comprou Jogo Base');
});

comprarPack.addEventListener('click', () => {
    alert('comprou Pack');
});

comprarEdicao.addEventListener('click', () => {
    alert('comprou Edição');
});

comprarDlc.addEventListener('click', () => {
    alert('comprou DLC');
});

denunciar.addEventListener('click', () => {
    alert('Denunciar');
});

