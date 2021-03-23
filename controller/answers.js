const express = require("express");
const router = express.Router();
const Answers = require("../models/answers");
const GATEKEEPER = require("../engineering/gatekeeper");

//api to get all answers from DB
router.get("/", (req, res) => {
  Answers.find({})
    .populate("creatorId")
    .then((answers) => {
      console.log(answers);
      GATEKEEPER.response(res, 200, answers);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to get all answers of given id
router.get("/:id", (req, res) => {
  Answers.find({})
    .populate("creatorId")
    .then((answers) => {
      GATEKEEPER.response(res, 200, answers);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

// api to get answers count by user
router.get("/user/:id", (req, res) => {
  Answers.countDocuments({ creatorId: req.params.id })
    .then((count) => {
      console.log(count);
      GATEKEEPER.response(res, 200, { count: count });
    })
    .catch((err) => {
      console.log(err);
      GATEKEEPER.response(res, 403, JSON.stringify({ message: err.message }));
    });
});

//api to get all answers for a given question that are not blocked
router.get("/unblocked/:id", (req, res) => {
  Answers.find({ isBlocked: false, questionId: req.params.id })
    .populate("creatorId")
    .then((answers) => {
      GATEKEEPER.response(res, 200, answers);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to update answer data
router.patch("/:id", (req, res) => {
  var objForUpdate = {};
  if (req.body.isBlocked != undefined)
    objForUpdate.isBlocked = req.body.isBlocked;
  if (req.body.privateAnswer != undefined)
    objForUpdate.privateAnswer = req.body.privateAnswer;
  if (req.body.answer != undefined) objForUpdate.answer = req.body.answer;

  Answers.updateOne({ _id: req.params.id }, objForUpdate)
    .then((answers) => {
      GATEKEEPER.response(res, 201, answers);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to create answer
router.post("/", (req, res) => {
  Answers.create({
    questionId: req.body.questionId,
    creatorId: req.body.creatorId,
    answer: req.body.answer,
    privateAnswer: req.body.privateAnswer,
    isBlocked: false,
  })
    .then((answer) => {
      GATEKEEPER.response(res, 201, answer);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 400, JSON.stringify({ message: err.message }));
    });
});

//api to delete an answer
router.delete("/:id", (req, res) => {
  Answers.deleteOne({ _id: req.params.id })
    .then((result) => {
      GATEKEEPER.response(res, 200, result);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

module.exports = router;
