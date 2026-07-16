const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
    },

    salary: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Interview",
        "Rejected",
        "Offer",
        "Wishlist",
      ],
      default: "Applied",
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    interviewDate: {
      type: Date,
    },

    jobLink: {
      type: String,
      default: "",
    },

    resumeLink: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);