const express = require("express");
const router = express.Router();
const Questions = require("../models/questions");
const GATEKEEPER = require("../engineering/gatekeeper");

//api to get all questions
router.get("/", (req, res) => {
  Questions.find({})
    .then((questions) => {
      GATEKEEPER.response(res, 200, questions);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to get all questions that are not blocked
router.get("/unblocked", (req, res) => {
  Questions.find({ isBlocked: false })
    .then((questions) => {
      GATEKEEPER.response(res, 200, questions);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to get all questions that are not blocked and are create by user
router.get("/unblocked/:id", (req, res) => {
  if (!req.params.id) {
    GATEKEEPER.response(res, 403, JSON.stringify({ message: "Bad Request" }));
  }
  Questions.find({ isBlocked: false, creatorId: req.params.id })
    .then((questions) => {
      GATEKEEPER.response(res, 200, questions);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to get a question by id
router.get("/:id", (req, res) => {
  Questions.findById(req.params.id)
    .then((question) => {
      GATEKEEPER.response(res, 200, question);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to update question data
router.patch("/:id", (req, res) => {
  var objForUpdate = {};
  if (req.body.question != undefined) objForUpdate.question = req.body.question;
  if (req.body.isBlocked != undefined)
    objForUpdate.isBlocked = req.body.isBlocked;

  Questions.updateOne({ _id: req.params.id }, objForUpdate)
    .then((questions) => {
      GATEKEEPER.response(res, 201, answers);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to create a question
router.post("/", (req, res) => {
  Questions.create({
    question: req.body.question,
    creatorId: req.body.creatorId,
    totalAnswers: req.body.totalAnswers,
    isBlocked: false,
  })
    .then((question) => {
      GATEKEEPER.response(res, 201, question);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 400, JSON.stringify({ message: err.message }));
    });
});

//api to delete a question
router.delete("/:id", (req, res) => {
  Questions.deleteOne({ _id: req.params.id })
    .then((result) => {
      GATEKEEPER.response(res, 200, result);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

module.exports = router;
