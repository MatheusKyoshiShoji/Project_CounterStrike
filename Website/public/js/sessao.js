var org = sessionStorage.ORG_USUARIO;
var quizUsuario = sessionStorage.QUIZ;
var steamId = sessionStorage.STEAMID_USUARIO;
var avatarSteam = sessionStorage.AVATAR_STEAM;

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

function validarAutenticao() {
    var username = sessionStorage.USERNAME_USUARIO;
    var steamId = sessionStorage.STEAMID_USUARIO;

    var profile_username = document.getElementById("profile_username");
    if (username != null && steamId != null) {
        profile_username.innerHTML = username;
    } else {
        window.location = "../login.html";
    }
}

async function dadosSteam(steamId) {
    fetch(`/usuarios/pegarDadosSteam/${steamId}`, {
        method: "GET",
    })
        .then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then((json) => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.AVATAR_STEAM = json.fotoPerfil;
                });
            }  else {
                console.log("Houve um erro ao acessar o seu SteamID!");

                resposta.text().then((texto) => {
                    console.error(texto);
                    /* finalizarAguardar(texto); */
                });
            }
        })
} 

function exibirNomeOrg(idOrg) {
    fetch(`/org/buscar/${idOrg}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta => {
                var imgOrg = document.getElementById('org_logo');
                var nomeOrg = resposta[0].nomeOrg;

                console.log(`Teste resposta: ${JSON.stringify(resposta)}`);
                profile_org.innerHTML = `${nomeOrg}`
                imgOrg.src = `../assets/img/Orgs/${nomeOrg}_logo.png`

            })
        })
}

function exibirPatente() {
    JSON.parse(quizUsuario).forEach(item => {
        var imgRank = document.getElementById('rank_img');
/*         console.log(item.idQuiz, item.tentativas, item.patente); */
        imgRank.src = `../assets/img/Ranks/${item.patente}.png`
    })
    
}



function atualizarFoto(imgUrl) {
    var imgAvatar = document.getElementById('steam_avatar');
    imgAvatar.src = `${imgUrl}`
}


document.addEventListener("DOMContentLoaded", () => { 
    validarAutenticao();
    exibirNomeOrg(org);
    exibirPatente();
    dadosSteam(steamId);
    atualizarFoto(avatarSteam)
});

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}