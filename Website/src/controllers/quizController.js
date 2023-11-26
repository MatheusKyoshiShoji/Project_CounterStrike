var quizModel = require("../models/quizModel");

function resultado(req, res) {
    var tentativas = req.body.tentativasServer;
    var acerto = req.body.acertoServer;
    var patente = req.body.patenteServer;
    var fkUsuario = req.body.fkUsuarioServer;

    if (tentativas == undefined) {
        res.status(400).send("Seu tentativas está undefined!");
    } else if (acerto == undefined) {
        res.status(400).send("Seu acerto está undefined!");
    } else if (patente == undefined) {
        res.status(400).send("Sua patente está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Sua fkUsuario está undefined!");
    } else {
        quizModel.resultado(tentativas, acerto, patente, fkUsuario)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a inserção! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarResulatoQuizUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.buscarResulatoQuizUsuario(idUsuario).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os quiz: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    resultado,
    buscarResulatoQuizUsuario
}