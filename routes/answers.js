var express = require("express");
var router = express.Router();

const answers = require("../controller/answers");

router.use("/", answers);

module.exports = router;
