const criar_conta = document.getElementById('criar_conta');
criar_conta.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senhaConf = document.getElementById('senha_conf').value;
    if (senha !== senhaConf) {
        alert("As senhas não são a mesma. Tente novamente.");
        return; // Impede o envio do formulário
    }
    alert('criando conta com email:${email} e ${senha}');
});

