const express = require("express");
const Review = require("../models/reviewModel");
const router = express.Router();
const {
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
} = require("../controller/reviewsController");

// GET all Courses
router.get("/courses", getCoursesbyName);

// GET all reviews
router.get("/reviews", getReviews);

//GET reviews of specific course
router.get("/course/:courseNum", getReviewsByCourse);

//GET reviews of specific user
router.get("/user/:nickname", getReviewsByNickName);

// GET a single review
router.get("/:id", getReview);

// POST a new review for exist course
router.post("/exist", createReview);

// POST a new review for new course
router.post("/new", createReviewNewCourse);

// DELETE a review
router.delete("/:id", deleteReview);

// UPDATE a review
router.patch("/:id", updateReview);

// DELETE a review
router.delete("/", deleteAllReviews);

module.exports = router;
