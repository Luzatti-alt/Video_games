function carregarInfo() {
    const nick = localStorage.getItem("nick"); // pega o nick salvo

    if (nick) {
        document.getElementById("nick").textContent = "Bem-vindo, " + nick;
    } else {
        document.getElementById("nick").textContent = "Bem-vindo, visitante";
    }
}

window.onload = carregarInfo;