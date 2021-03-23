const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reviews", reviewsSchema);
