const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    courseNumber: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    hardGrade: {
      type: String,
      required: true,
    },
    interestGrade: {
      type: String,
      required: true,
    },
    effortGrade: {
      type: String,
      required: true,
    },
    totalGrade: {
      type: String,
      required: true,
    },
    counter: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);
