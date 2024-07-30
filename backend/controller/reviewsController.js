const Review = require("../models/reviewModel");
const Course = require("../models/courseModel");
const mongoose = require("mongoose");

// get all courses by name
const getCoursesbyName = async (req, res) => {
  const courses = await Course.find({}).sort({ courseName: 1 });

  res.status(200).json(courses);
};

// get all reviews
const getReviews = async (req, res) => {
  const reviews = await Review.find({}).sort({ createdAt: -1 });

  res.status(200).json(reviews);
};
//GET reviews of specific course
const getReviewsByCourse = async (req, res) => {
  const { courseNum } = req.params;
  const reviews = await Review.find({ courseNumber: courseNum });

  if (reviews.length == 0) {
    return res.status(404).json({ error: "No reviews for this course number" });
  }

  res.status(200).json(reviews);
};

//GET reviews of specific user
const getReviewsByNickName = async (req, res) => {
  const { nickname } = req.params;

  const reviews = await Review.find({ nickname: nickname }).sort({
    createdAt: -1,
  });

  res.status(200).json(reviews);
};

// get a single review
const getReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

// create a new review for new course
const createReviewNewCourse = async (req, res) => {
  const {
    nickname,
    courseNumber,
    courseName,
    lecturer,
    year,
    semester,
    hard,
    intrest,
    effort,
    grade,
    comment,
  } = req.body;

  // add to the database
  try {
    const courses = await Course.find({}).sort({ courseName: 1 });
    if (courses.some((course) => course.courseNumber === courseNumber)) {
      console.log("Existing Course");
      return res.status(400).json({ error: "Existing Course" });
    }
    const review = await Review.create({
      nickname,
      courseNumber,
      courseName,
      lecturer,
      year,
      semester,
      hard,
      intrest,
      effort,
      grade,
      comment,
    });

    let counter = 1;
    const newCourse = await Course.create({
      courseNumber,
      courseName,
      hardGrade: hard,
      interestGrade: intrest,
      effortGrade: effort,
      totalGrade: grade,
      counter,
    });

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCourse = (counter, average, newGrade) => {
  average = (average * counter + parseFloat(newGrade)) / (counter + 1);
  return average;
};

// create a new review for exists course
const createReview = async (req, res) => {
  const {
    nickname,
    courseNumber,
    courseName,
    lecturer,
    year,
    semester,
    hard,
    intrest,
    effort,
    grade,
    comment,
  } = req.body;

  const myReview = await Review.findOne({
    courseNumber: courseNumber,
    nickname: nickname,
  });

  if (myReview) {
    return res.status(400).json({ error: "You already commented this course" });
  }

  try {
    const review = await Review.create({
      nickname,
      courseNumber,
      courseName,
      lecturer,
      year,
      semester,
      hard,
      intrest,
      effort,
      grade,
      comment,
    });

    const course = await Course.findOne({ courseNumber: courseNumber });
    let counter = parseFloat(course.counter);
    let newHardGrade = updateCourse(
      counter,
      parseFloat(course.hardGrade),
      hard
    );
    let newInterestGrade = updateCourse(
      counter,
      parseFloat(course.interestGrade),
      intrest
    );
    let newEffortGrade = updateCourse(
      counter,
      parseFloat(course.effortGrade),
      effort
    );
    let newTotalGrade = updateCourse(
      counter,
      parseFloat(course.totalGrade),
      grade
    );
    updatedCourse = await Course.findOneAndUpdate(
      { courseNumber: courseNumber },
      {
        counter: ++course.counter,
        hardGrade: newHardGrade.toString(),
        interestGrade: newInterestGrade.toString(),
        effortGrade: newEffortGrade.toString(),
        totalGrade: newTotalGrade.toString(),
      }
    );

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAverageDelete = (counter, average, newGrade) => {
  average = (average * counter - parseFloat(newGrade)) / (counter - 1);
  return average;
};

// delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such review" });
  }

  const review = await Review.findOneAndDelete({ _id: id });

  if (!review) {
    return res.status(400).json({ error: "No such review" });
  }

  const course = await Course.findOne({ courseNumber: review.courseNumber });
  let counter = parseFloat(course.counter);
  if (counter == 1) {
    await Course.findOneAndDelete({ courseNumber: review.courseNumber });
    res.status(200).json(review);
  } else {
    let newHardGrade = updateAverageDelete(
      counter,
      parseFloat(course.hardGrade),
      review.hard
    );
    let newInterestGrade = updateAverageDelete(
      counter,
      parseFloat(course.interestGrade),
      review.intrest
    );
    let newEffortGrade = updateAverageDelete(
      counter,
      parseFloat(course.effortGrade),
      review.effort
    );
    let newTotalGrade = updateAverageDelete(
      counter,
      parseFloat(course.totalGrade),
      review.grade
    );
    const updatedCourse = await Course.findOneAndUpdate(
      { courseNumber: review.courseNumber },
      {
        counter: --course.counter,
        hardGrade: newHardGrade.toString(),
        interestGrade: newInterestGrade.toString(),
        effortGrade: newEffortGrade.toString(),
        totalGrade: newTotalGrade.toString(),
      }
    );
    res.status(200).json(review);
  }
};
const deleteAllReviews = async (req, res) => {
  await Review.deleteMany({});
  return res.status(200).json({ mssg: "all deleted" });
};

// update a review
const updateReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such review" });
  }
  const oldReview = await Review.findOne({ _id: id });
  const review = await Review.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!review) {
    return res.status(400).json({ error: "No such review" });
  }
  if (req.body.grade != undefined) {
    const course = await Course.findOne({ courseNumber: review.courseNumber });
    let newGrade = parseFloat(course.grade);
    newGrade =
      (newGrade * course.counter -
        parseFloat(oldReview.grade) +
        parseFloat(req.body.grade)) /
      course.counter;
    const updatedCourse = await Course.findOneAndUpdate(
      { courseNumber: review.courseNumber },
      {
        grade: newGrade.toString(),
      }
    );
  }
  res.status(200).json(review);
};

module.exports = {
  getCoursesbyName,
  getReviews,
  getReviewsByCourse,
  getReviewsByNickName,
  getReview,
  createReview,
  createReviewNewCourse,
  deleteReview,
  deleteAllReviews,
  updateReview,
};
