var database = require("../database/config");

function buscarPorId(idOrg) {
  var query = `select * from organizacao where idOrg = '${idOrg}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from organizacao`;

  return database.executar(query);
}

function buscarPornomeOrg(nomeOrg) {
  var query = `select * from organizacao where nomeOrg = '${nomeOrg}'`;

  return database.executar(query);
}


module.exports = { buscarPornomeOrg, buscarPorId, listar };
