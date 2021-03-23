const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      requried: true,
      ref: "user",
    },
    advocateId: {
      type: mongoose.Types.ObjectId,
      requried: true,
      ref: "user",
    },
    startTime: {
      type: "Number",
      requried: true,
    },
    endTime: {
      type: "Number",
      requried: true,
    },
    isOver: {
      type: "Boolean",
    },
    participants: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "user",
          requried: true,
        },
      ],
    },
    type: {
      type: "String",
      requried: true,
    },
    paymentId: {
      type: "String",
      unique: true,
      requried: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("consultation", consultationSchema);
