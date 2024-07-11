import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Modal from "./Modal";

const ReviewForm = ({ fetchCourses, courses }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();
  const [isNewCourse, setIsNewCourse] = useState(false);

  const [courseNumber, setCourseNumber] = useState("");
  const [courseName, setCourseName] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("A");
  const [hard, setHard] = useState("5");
  const [intrest, setIntrest] = useState("5");
  const [effort, setEffort] = useState("5");
  const [grade, setGrade] = useState("5");
  const [comment, setComment] = useState("");

  const [error, setError] = useState(null);

  const handleHardChange = (event) => {
    setHard(event.target.value);
  };

  const handleIntrestChange = (event) => {
    setIntrest(event.target.value);
  };

  const handleEffortChange = (event) => {
    setEffort(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseC = await fetch(
      "https://course-server-cf4deh2uv-liors-projects-6316a22e.vercel.app/api/reviews/courses/"
    );
    const jsonC = await responseC.json();
    let createUrl = "/api/reviews/new";
    let realCourseName = courseName;
    if (responseC.ok) {
      let found = false;
      let index = 0;
      for (let i = 0; i < jsonC.length && !found; i++) {
        found = jsonC[i].courseNumber === courseNumber;
        index = i;
      }
      if (found) {
        realCourseName = jsonC[index].courseName;
        createUrl = "/api/reviews/exist";
      }
    }

    const review = {
      nickname: user.email,
      courseNumber,
      courseName: realCourseName,
      lecturer,
      year,
      semester,
      hard,
      intrest,
      effort,
      grade,
      comment,
    };

    const response = await fetch(createUrl, {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setCourseName("");
      setIsNewCourse(false);
      setCourseNumber("");
      setLecturer("");
      setYear("");
      setSemester("A");
      setHard("5");
      setIntrest("5");
      setEffort("5");
      setGrade("5");
      setComment("");

      setShowModal(true);
      fetchCourses();
    }
  };

  const chooseCourse = (courseNumber, courseName) => {
    if (courseName === "new") {
      setCourseName("");
      setCourseNumber("");
      setIsNewCourse(true);
    } else {
      setCourseNumber(courseNumber);
      setCourseName(courseName);
      setIsNewCourse(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new review</h3>

      <select
        value={isNewCourse ? "new course" : courseNumber}
        onChange={(e) =>
          chooseCourse(
            e.target.value,
            e.target.options[e.target.selectedIndex].dataset.coursename
          )
        }
        required
      >
        <option value="" disabled>
          Choose Course
        </option>
        <option data-coursename="new" value="">
          Add new course
        </option>
        {courses &&
          courses.map((course) => (
            <option
              key={course.courseNumber}
              value={course.courseNumber}
              data-coursename={course.courseName}
            >
              {course.courseName} - {course.courseNumber}
            </option>
          ))}
      </select>

      {isNewCourse && (
        <>
          <label>Course Number</label>
          <input
            className="text"
            type="text"
            required
            value={courseNumber}
            onChange={(e) => setCourseNumber(e.target.value)}
            disabled={!isNewCourse}
          />
          <label>Course Name</label>
          <input
            className="text"
            type="text"
            required
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            disabled={!isNewCourse}
          />
        </>
      )}

      <label> Lecturer name</label>
      <input
        type="text"
        className="text"
        required
        value={lecturer}
        onChange={(e) => setLecturer(e.target.value)}
      />
      <label>Year Taken</label>
      <input
        className="text"
        type="number"
        required
        min="1969"
        max="2050"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      ></input>

      <label>Semester</label>
      <select value={semester} onChange={(e) => setSemester(e.target.value)}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>

      <label>Industry Relevance</label>
      <input
        className="grade"
        type="range"
        id="hardSlider"
        min="1"
        max="5"
        value={hard}
        onChange={handleHardChange}
        step="1"
      />
      <p>Selected value: {hard}</p>

      <label>Interest</label>
      <input
        className="grade"
        type="range"
        id="intrestSlider"
        min="1"
        max="5"
        value={intrest}
        onChange={handleIntrestChange}
        step="1"
      />
      <p>Selected value: {intrest}</p>

      <label>Effort</label>
      <input
        className="grade"
        type="range"
        id="effortSlider"
        min="1"
        max="5"
        value={effort}
        onChange={handleEffortChange}
        step="1"
      />
      <p>Selected value: {effort}</p>

      <label>Total grade</label>
      <input
        className="grade"
        type="range"
        id="gradeSlider"
        min="1"
        max="5"
        value={grade}
        onChange={handleGradeChange}
        step="1"
      />
      <p>Selected value: {grade}</p>

      <label>Personal Opinion:</label>
      <textarea
        className="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <br />
      <button>Add Review</button>
      {error && <div className="error">{error}</div>}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Success!</h2>
        <p>Thank you for your comment!</p>
      </Modal>
    </form>
  );
};

export default ReviewForm;
