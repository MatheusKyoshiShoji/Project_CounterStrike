function dadosSteam(steamId) {
    fetch(`/usuarios/pegarDadosSteam/${steamId}`, {
        method: "GET",
    })
        .then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then((json) => {
                    sessionStorage.AVATAR_STEAM = json.fotoPerfil;
                    sessionStorage.PARTIDAS = json.partiadas;
                    sessionStorage.PARTIDAS_GANHA = json.partidasGanha;
                    sessionStorage.ROUNDS_JOGADOS = json.roundsJogados;
                    sessionStorage.MVP = json.melhorDaPartida;
                    sessionStorage.ABATES = json.abates;
                    sessionStorage.MORTES = json.mortes;
                    sessionStorage.DANO_CAUSADO = json.danoCausado;
                    sessionStorage.HS = json.tirosNaCabeca;
                    sessionStorage.BOMBAS_PLANTADAS = json.bombasPlantada;
                    sessionStorage.BOMBAS_DEFUSADAS = json.bombasDefusadas;
                    sessionStorage.MELHORES_MAPA = json.listaMelhoresMapas;
                    sessionStorage.MELHORES_MAPA_WR = json.listaMelhoresMapasWr;
                    sessionStorage.MELHOR_MAPA = json.melhorMapa;
                    sessionStorage.PIOR_MAPA = json.piorMapa;
                    sessionStorage.ARMAS = json.listaArmas;
                    sessionStorage.ARMAS_ABATE = json.listaAbatesPorTiro;
                });

                atualizarFoto();

            } else {
                console.log("Houve um erro ao acessar o seu SteamID!");

                resposta.text().then((texto) => {
                    console.error(texto);
                });
            }
        })
}

function entrar() {

    var usernameVar = input_username.value;
    var senhaVar = input_senha.value;
    var audio = document.getElementById("loginAudio")

    if (usernameVar == "" || senhaVar == "") {
        var textoErro = `Mensagem de erro para todos os campos em branco`
        modalError(textoErro);
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
                audio.play();
                resposta.json().then((json) => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.USERNAME_USUARIO = json.username;
                    sessionStorage.STEAMID_USUARIO = json.steamId;
                    sessionStorage.ORG_USUARIO = json.idOrg;
                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.QUIZ = JSON.stringify(json.quiz)

                    dadosSteam(json.steamId);
                    setTimeout(function () {

                        window.location = "./profile/stats.html";
                    }, 3000); // apenas para exibir o loading
                });


            } else {
                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then((texto) => {
                    console.error(texto);
                    textoErro = `Erro na validaçãode dados ${texto}`
                    modalError(textoErro);
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

    var textoErro;


    if (usernameVar == "" || steamIdVar == "" || senhaVar == "" || organizacaoVar == "" || senhaConfirma == "") {
        textoErro = "Todos os campos devem estar preenchidos"
        modalError(textoErro)
        return false;
    } else if (usernameVar.length  <= 4 || usernameVar.indexOf(' ') >= 0) {
        textoErro = "Username deve conter pelo menos mais de 4 caracteres e não conter nenhum espaçamento"
        modalError(textoErro)
        return false;
    } else if (senhaVar.length  <= 6 || senhaVar.indexOf(' ') >= 0) {
        textoErro = "Senha deve conter pelo menos mais de 6 caracteres e não conter nenhum espaçamento"
        modalError(textoErro)
        return false;
    } else if (senhaVar !== senhaConfirma) {
        textoErro = "A senhas não se conferem";
        modalError(textoErro);
        return false;
    } else {
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
                textoErro = `Erro ao inserir os dados no Banco de Dados ${resposta}`
                modalError(textoErro);
            });

        return false;
    }





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

document.getElementById("autenticar").addEventListener("click", () => {
    entrar();
});

function modalError(mensagemErro) {
    const modal = document.querySelector('.modal')
    const closeBtn = document.querySelector('.close-icon')
    const textModal = document.getElementById('mensagem-erro');

    modal.classList.add('active')
    textModal.innerHTML = `${mensagemErro}`;

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    })

    window.addEventListener('click', event => {
        if (event.target == modal) {
            modal.classList.remove('active')
        }
    })

}

