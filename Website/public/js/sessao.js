// Switch.js
function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

function validarAutenticao() {
    var username = sessionStorage.USERNAME_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (username != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

function entrar() {

    var usernameVar = input_username.value;
    var senhaVar = input_senha.value;

    if (usernameVar == "" || senhaVar == "") {
        /* cardErro.style.display = "block"; */
        alert("Mensagem de erro para todos os campos em branco")
        /* finalizarAguardar(); */
        return false;
    } else {
        setInterval(/* sumirMensagem, */ 5000);
    }

    console.log("FORM LOGIN: ", usernameVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usernameServer: usernameVar,
            senhaServer: senhaVar,
        }),
    })
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!");

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then((json) => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.USERNAME_USUARIO = json.username;
                    sessionStorage.NOME_USUARIO = json.nome;
                    /*             sessionStorage.ID_USUARIO = json.id;
                                sessionStorage.AQUARIOS = JSON.stringify(json.aquarios); */

                    setTimeout(function () {
                        window.location = "./profile/stats.html";
                    }, 1000); // apenas para exibir o loading
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then((texto) => {
                    console.error(texto);
                    /* finalizarAguardar(texto); */
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });

    return false;
}

function cadastrar() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var usernameVar = input_user.value;
    var senhaVar = input_Senha.value;
    var steamIdVar = input_steam.value;
    var senhaConfirma = input_senhaConfirma.value;
    var organizacaoVar = listaorganizacao.value;
    console.log(usernameVar);
    console.log(senhaVar);
    console.log(steamIdVar);
    console.log(organizacaoVar);
    console.log(senhaConfirma);
    if (usernameVar == "" || steamIdVar == "" || senhaVar == "" || organizacaoVar == "" || senhaConfirma == "") {
        alert("(Mensagem de erro para todos os campos em branco)");
        return false;
    } /* else {
        setInterval(sumirMensagem, 5000);
    } */

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            usernameServer: usernameVar,
            steamIdServer: steamIdVar,
            senhaServer: senhaVar,
            idOrgServer: organizacaoVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...")

                setTimeout(() => {
                    window.location = "index.html";
                }, "2000");

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            /* finalizarAguardar(); */
        });

    return false;
}



function listar() {
    fetch("/org/listar", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((organizacaos) => {
                organizacaos.forEach((organizacao) => {
                    listaorganizacao.innerHTML += `<option value='${organizacao.idOrg}'>${organizacao.nomeOrg}</option>`;
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}