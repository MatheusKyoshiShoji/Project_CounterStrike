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

function atualizarFoto() {
    var imgAvatar = document.getElementById('steam_avatar');
    imgAvatar.src = `${avatarSteam}`
    console.log("Alterou")
}




function exibirNomeOrg(idOrg) {
    fetch(`/org/buscar/${idOrg}`, {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then(resposta => {
                var imgOrg = document.getElementById('org_logo');
                var nomeOrg = resposta[0].nomeOrg;
/* 
                console.log(`Teste resposta: ${JSON.stringify(resposta)}`); */
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


// FUNÇÕES ACIONADOS AO RECARREGAR A PÁGINA

document.addEventListener("DOMContentLoaded", () => { 
    validarAutenticao();
    exibirNomeOrg(org);
    exibirPatente();    
    atualizarFoto()
});



function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}