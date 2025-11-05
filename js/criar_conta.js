const criar_conta = document.getElementById('criar_conta');
criar_conta.addEventListener('click', () => { criarConta();});
function criarConta() {
    const button = document.getElementById('criar_conta');
    button.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const senhaConf = document.getElementById('senha_conf').value;

        if (senha !== senhaConf) {
            alert("As senhas não são iguais. Tente novamente.");
            return;
        }

        const nick = document.getElementById('nick').value;
        if (!nick) {
            alert("Você precisa fornecer um nick.");
            return;
        }

        const dadosConta = { nick, email, senha };

        fetch('http://10.158.49.18:5000/criar_conta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosConta)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem);
            window.location.href = "/index.html";
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao criar a conta. Tente novamente.");
        });
    });
}

// Chamar a função após o DOM carregar
window.addEventListener('DOMContentLoaded', criarConta);
