document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    // Cria o objeto com os dados para enviar
    const dados = {
        email: email,
        senha: senha
    };
    fetch("http://10.158.49.11:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "ok") {
            alert(data.mensagem);
            localStorage.setItem("usuarioEmail", email);
            localStorage.setItem("nick", nick);//dai ele vai trocar o nick
            window.location.href = "/index.html";
        } else {
            alert(data.mensagem);
        }
    })
    .catch(error => {
        console.error("Erro ao fazer login:", error);
        alert("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
    });
});
