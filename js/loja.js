const adquirirDemo = document.getElementById('adquirir_demo');
const comprarJogoBase = document.getElementById('comprar_jogo_base');
const comprarPack = document.getElementById('comprar_pack');
const comprarEdicao = document.getElementById('comprar_edicao');
const comprarDlc = document.getElementById('comprar_dlc');
const denunciar = document.getElementById('denunciar_but');
const pesquisa = document.getElementById('pesquisar');

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

