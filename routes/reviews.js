var express = require("express");
var router = express.Router();

const reviews = require("../controller/reviews");

router.use("/", reviews);

module.exports = router;
