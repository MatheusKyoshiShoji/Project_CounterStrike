const { API } = require('csgo.js');
const { MAPS } = require("csgo.js");
require('dotenv').config();
var usuarioModel = require("../models/usuarioModel");
var quizModel = require("../models/quizModel")

function autenticar(req, res) {
    var username = req.body.usernameServer;
    var senha = req.body.senhaServer;

    if (username == undefined) {
        res.status(400).send("Seu username está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(username, senha)
            .then(
                async function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        quizModel.buscarResulatoQuizUsuario(resultadoAutenticar[0].idUsuario)
                            .then((resultadoQuiz) => {
                                res.json({
                                    idUsuario: resultadoAutenticar[0].idUsuario,
                                    username: resultadoAutenticar[0].username,
                                    steamId: resultadoAutenticar[0].steamId,
                                    senha: resultadoAutenticar[0].senha,
                                    idOrg: resultadoAutenticar[0].idOrg,
                                    quiz: resultadoQuiz
                                });
                            })

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("username e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var username = req.body.usernameServer;
    var steamId = req.body.steamIdServer;
    var senha = req.body.senhaServer;
    var idOrg = req.body.idOrgServer;

    // Faça as validações dos valores
    if (username == undefined) {
        res.status(400).send("Seu username está undefined!");
    } else if (steamId == undefined) {
        res.status(400).send("Seu steamId está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idOrg == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(username, steamId, senha, idOrg)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

async function pegarDadosSteam(req, res) {
    try {
        var steamId = req.params.steamId;

        if (steamId == undefined) {
            res.status(400).send("Seu steamId está undefined!");
        } else {
            console.log("tome " + steamId);
            const userSteam = await API.fetchUser(steamId, process.env.STEAM_TOKEN);

            const { avatarfull } = userSteam.info();
            const { kills, deaths, matches_played, matches_won, headshot_kills,
                mvps, damage_done, rounds_played, planted_bombs, defused_bombs } = userSteam.stats();

            var listaMelhoresMapas = [];
            var listaMelhoresMapasWr = [];
            
            const maps = userSteam.maps();
            const keys = Object.keys(maps);
            for (const name of keys) {
                const map = maps[name];
                var mapWinrate = map.wr * 100;
                if (map.wr > 0.5 && map.played > 100) {
                    listaMelhoresMapas.push(`${MAPS[name]}`);
                    listaMelhoresMapasWr.push(parseInt(mapWinrate));
                }
            }

            var maiorNumeroDaLista = listaMelhoresMapasWr[0];
            var menorNumeroDaLista = listaMelhoresMapasWr[0];
            var melhorMapaLista = listaMelhoresMapas[0];
            var piorMapaLista = listaMelhoresMapas[0];

            for (var i = 0; i < listaMelhoresMapas.length; i++) {
                var wrAtual = listaMelhoresMapasWr[i];
                var mapaAtual = listaMelhoresMapas[i];
                if (wrAtual < menorNumeroDaLista) {
                    menorNumeroDaLista = wrAtual;
                    piorMapaLista = mapaAtual;
                }

                if (wrAtual > maiorNumeroDaLista) {
                    maiorNumeroDaLista = wrAtual;
                    melhorMapaLista = mapaAtual;
                }
            }

            res.json({
                fotoPerfil: avatarfull,
                partiadas: matches_played,
                partidasGanha: matches_won,
                roundsJogados: rounds_played,
                melhorDaPartida: mvps,
                abates: kills,
                mortes: deaths,
                danoCausado: damage_done,
                tirosNaCabeca: headshot_kills,
                bombasPlantada: planted_bombs,
                bombasDefusadas: defused_bombs,
                listaMelhoresMapas,
                listaMelhoresMapasWr,
                melhorMapa: melhorMapaLista,
                piorMapa: piorMapaLista
            })
        }
    } catch (error) {
        console.error("Erro ao pegar dados do Steam:", error);
        res.status(500).send("Erro interno ao processar a solicitação.");
    }
    
}


module.exports = {
    autenticar,
    cadastrar,
    pegarDadosSteam
}