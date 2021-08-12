const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    following: {
      type: [String],
    },
    followedBy: {
      type: [String],
    },
    phoneVerified: {
      type: Boolean,
    },
    isVerified: {
      type: Boolean,
    },
    isSuspended: {
      type: Boolean,
    },
    isAdvocate: {
      type: Boolean,
    },
    isFeatured: {
      type: Boolean,
    },
    isTrending: {
      type: Boolean,
    },
    advocateDetails: {
      experience: {
        type: Number,
      },
      about: {
        type: String,
      },
      // educationQualifications: {
      //   type: Mixed,
      // },
      visitingCourt: {
        type: String,
      },
      serviceCities: {
        type: String,
      },
      areaOfLaw: {
        type: [String],
      },
      availability: {
        type: [String],
      },

      consultationCharges: {
        video: {
          price: {
            type: Number,
          },
          time: {
            type: Number,
          },
        },
        voice: {
          price: {
            type: Number,
          },
          time: {
            type: Number,
          },
        },
        chat: {
          price: {
            type: Number,
          },
          time: {
            type: Number,
          },
        },
      },
    },
    additionalDetails: {
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
    documents: {
      aadharCard: {
        type: String,
      },
      enrollmentNumber: {
        type: String,
      },
    },
    seenIntro: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
