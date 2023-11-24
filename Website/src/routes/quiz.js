var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/resultado", function (req, res) {
    quizController.resultado(req, res);
})

    
module.exports = router;