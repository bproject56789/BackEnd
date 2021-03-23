const mongoose = require("mongoose");

const advocateDetailsSchema = new mongoose.Schema(
  {
    experience: {
      type: Number,
    },
    about: {
      type: String,
    },
    visitingCourt: {
      type: String,
    },
    serviceCities: {
      type: String,
    },
    areaOfLaw: [
      {
        type: String,
      },
    ],
    availability: [
      {
        type: String,
      },
    ],
    consultationCharges: {
      type: mongoose.Types.ObjectId,
      ref: "consultationCharges",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("advocateDetails", advocateDetailsSchema);
