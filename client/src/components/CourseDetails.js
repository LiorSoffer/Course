import { Link } from "react-router-dom";

const CourseDetails = ({ course }) => {
  const totalGrade = parseFloat(course.totalGrade);
  const hardGrade = parseFloat(course.hardGrade);
  const interestGrade = parseFloat(course.interestGrade);
  const effortGrade = parseFloat(course.effortGrade);
  return (
    <div className="course-details1 course-details">
      <Link
        to={`/courses/${course.courseNumber}/${course.courseName}`}
        style={{ textDecoration: "none" }}
      >
        <h4>
          {course.courseName} - {course.courseNumber}
        </h4>
        <h4>Rated {totalGrade.toFixed(2)}</h4>
        <p>
          <strong>Industry Relevance: </strong>
          {hardGrade.toFixed(2)}
        </p>
        <p>
          <strong>Interest: </strong>
          {interestGrade.toFixed(2)}
        </p>
        <p>
          <strong>Effort: </strong>
          {effortGrade.toFixed(2)}
        </p>
      </Link>
    </div>
  );
};

export default CourseDetails;
