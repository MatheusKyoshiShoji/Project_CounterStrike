var orgModel = require("../models/orgModel");

function buscarPornomeOrg(req, res) {
  var nomeOrg = req.query.nomeOrg;

  orgModel.buscarPornomeOrg(nomeOrg).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  orgModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var idOrg = req.params.idOrg;

  orgModel.buscarPorId(idOrg).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  buscarPornomeOrg,
  buscarPorId,
  listar,
};
