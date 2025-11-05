const criar_conta = document.getElementById('criar_conta');
criar_conta.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senhaConf = document.getElementById('senha_conf').value;
    if (senha !== senhaConf) {
        alert("As senhas não são a mesma. Tente novamente.");
        return; // Impede o envio do formulário
    }
    if (!nick) {
        alert("Você precisa fornecer um nick.");
        return; // Impede o envio se o nick for inválido
    }
    const nick = prompt("Por favor, escolha um nick:");
    const dadosConta = {
        nick: nick,
        email: email,
        senha: senha,
        senha_conf: senhaConf
    };
    fetch('http://10.158.49.11:5000/criar_conta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosConta)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'ok') {
            alert(data.mensagem);
        } else {
            alert(data.mensagem);
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao criar a conta. Tente novamente.");
    });
    alert(`criando conta com email: ${email} e ${senha}`);
});

