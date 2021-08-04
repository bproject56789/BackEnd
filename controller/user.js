const express = require("express");
const router = express.Router();
const User = require("../models/user");
const GATEKEEPER = require("../engineering/gatekeeper");

//api to get all users
router.get("/", (req, res) => {
  User.find({})
    .then((user) => {
      GATEKEEPER.response(res, 200, user);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to get all advocates
router.get("/allAdvocates", (req, res) => {
  console.log(req.query);

  var conditions = {
    isAdvocate: true,
    isSuspended: false,
  };

  if (req.query) {
    if (req.query.isVerified && req.query.isVerified === "true") {
      conditions.isVerified = true;
    }
    if (req.query.type) {
      conditions["advocateDetails.areaOfLaw"] = req.query.type;
    }
    if ([">", "-", "<"].includes(req.query.separator)) {
      if (req.query.separator !== "-") {
        if (req.query.separator === ">") {
          conditions["advocateDetails.experience"] = {
            $gt: req.query.upperLimit,
          };
        } else {
          conditions["advocateDetails.experience"] = {
            $lt: req.query.upperLimit,
          };
        }
      } else {
        conditions["advocateDetails.experience"] = {
          $gte: req.query.lowerLimit,
          $lte: req.query.upperLimit,
        };
      }
    }
  }

  console.log(conditions);

  User.find(conditions)
    .then((user) => {
      console.log(user);
      GATEKEEPER.response(res, 200, user);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to login a user
router.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
      if (!user) {
        throw new Error("no user with that id");
      }
      GATEKEEPER.response(res, 200, user);
    })
    .catch((err) => {
      console.log(err);
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to get user by id
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      GATEKEEPER.response(res, 200, user);
    })
    .catch((err) => {
      GATEKEEPER.response(res, 404, JSON.stringify({ message: err.message }));
    });
});

//api to create a user
router.post("/", (req, res, next) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    photo: req.body.photo,
    password: req.body.password,
    isAdvocate: req.body.isAdvocate,
  })
    .then((admin) => {
      GATEKEEPER.response(res, 201, admin);
    })
    .catch((err) => {
      console.log(err);
      GATEKEEPER.response(res, 400, JSON.stringify({ message: err.message }));
    });
});

//api to update user data
router.patch("/:id", (req, res) => {
  var objForUpdate = {};

  if (req.body.seenIntro) objForUpdate.seenIntro = req.body.seenIntro;
  if (req.body.name) objForUpdate.name = req.body.name;
  if (req.body.photo) objForUpdate.photo = req.body.photo;
  if (req.body.phone) objForUpdate.phone = req.body.phone;
  if (req.body.isVerified != undefined)
    objForUpdate.isVerified = req.body.isVerified;
  if (req.body.phoneVerified)
    objForUpdate.phoneVerified = req.body.phoneVerified;
  if (req.body.isSuspended != undefined)
    objForUpdate.isSuspended = req.body.isSuspended;
  if (req.body.advocateDetails)
    objForUpdate.advocateDetails = req.body.advocateDetails;
  if (req.body.additionalDetails)
    objForUpdate.additionalDetails = req.body.additionalDetails;
  if (req.body.documents) objForUpdate.documents = req.body.documents;

  console.log(objForUpdate);

  User.updateOne({ _id: req.params.id }, objForUpdate)
    .then((user) => {
      GATEKEEPER.response(res, 201, user);
    })
    .catch((err) => {
      console.log(err);
      GATEKEEPER.response(
        res,
        401,
        JSON.stringify({ message: "Profile update failed" })
      );
    });
});

module.exports = router;
