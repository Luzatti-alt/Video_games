//aqui ele fara alterações conforme a conta
function carregarInfo() {
    const Nick = localStorage.getItem("nick");//so para diferenciar o item salvo
    //com o item aqui
    document.getElementById("nick").textContent = dados.Nick;
}
document.getElementById("nick").textContent = "bem vindo,"+dados.Nick;