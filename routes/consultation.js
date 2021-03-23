var express = require("express");
var router = express.Router();

const consultations = require("../controller/consultation");

router.use("/", consultations);

module.exports = router;
