var express = require("express");
var router = express.Router();

var orgController = require("../controllers/orgController");

router.get("/buscar", function (req, res) {
    orgController.buscarPornomeOrg(req, res);
});

router.get("/buscar/:idOrg", function (req, res) {
  orgController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  orgController.listar(req, res);
});

module.exports = router;