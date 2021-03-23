const express = require("express");
const router = express.Router();
const Reviews = require("../models/reviews");
const GATEKEEPER = require("../engineering/gatekeeper");

//api to get all reviews
router.get("/", (req, res) => {
  Reviews.find({})
    .then((reviews) => {
      GATEKEEPER.response(res, 200, reviews);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to get all reviews of user
router.get("/:id", (req, res) => {
  Reviews.find({ userId: req.params.id })
    .populate("creatorId")
    .populate("userId")
    .then((reviews) => {
      console.log(reviews);
      GATEKEEPER.response(res, 200, reviews);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to create user
router.post("/", (req, res) => {
  Reviews.create({
    rating: req.body.rating,
    review: req.body.review,
    creatorId: req.body.creatorId,
    userId: req.body.userId,
  })
    .then((review) => {
      GATEKEEPER.response(res, 201, review);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 400, JSON.stringify({ message: err.message }));
    });
});

module.exports = router;
