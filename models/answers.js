const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: "questions",
      required: true,
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    privateAnswer: {
      type: "Boolean",
      required: true,
    },
    isBlocked: {
      type: "Boolean",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("answers", answersSchema);
