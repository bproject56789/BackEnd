var express = require("express");
var router = express.Router();

const questions = require("../controller/questions");

router.use("/", questions);

module.exports = router;
