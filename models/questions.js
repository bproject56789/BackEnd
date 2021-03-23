const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: "String",
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    totalAnswers: {
      type: "Number",
    },
    isBlocked: {
      type: "Boolean",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("questions", questionSchema);
