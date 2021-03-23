const express = require("express");
const router = express.Router();
const Consultations = require("../models/consultation");
const GATEKEEPER = require("../engineering/gatekeeper");

//api to get all consultations
router.get("/", (req, res) => {
  Consultations.find({})
    .then((consultation) => {
      GATEKEEPER.response(res, 200, consultation);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to get a consultations of given user by id
router.get("/:id", (req, res) => {
  Consultations.find({ participants: req.params.id })
    .populate("userId")
    .populate("advocateId")
    .then((consultation) => {
      console.log(consultation);
      GATEKEEPER.response(res, 200, consultation);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to create a consultation
router.post("/", (req, res) => {
  console.log(req.body);
  Consultations.create({
    userId: req.body.userId,
    advocateId: req.body.advocateId,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    isOver: req.body.isOver,
    participants: req.body.participants,
    type: req.body.type,
    paymentId: req.body.paymentId,
  })
    .then((consultation) => {
      GATEKEEPER.response(res, 201, consultation);
    })
    .catch((err) => {
      console.log(err);
      GATEKEEPER.response(res, 400, JSON.stringify({ message: err.message }));
    });
});

module.exports = router;
