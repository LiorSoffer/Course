const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    courseNumber: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    lecturer: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    hard: {
      type: String,
      required: true,
    },
    intrest: {
      type: String,
      required: true,
    },
    effort: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
