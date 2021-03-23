const mongoose = require("mongoose");

const additionalDetailsSchema = new mongoose.Schema(
  {
    dateOfBirth: {
      type: Number,
    },
    gender: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("additionalDetails", additionalDetailsSchema);
