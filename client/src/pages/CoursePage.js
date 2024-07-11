import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyReview from "../components/MyReview";

const CoursePage = () => {
  const { courseNumber, courseName } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        "https://course-server-cf4deh2uv-liors-projects-6316a22e.vercel.app/api/reviews/course/" +
          courseNumber
      );
      const json = await response.json();

      if (response.ok) {
        setReviews(json);
      }
    };

    fetchReviews();
  }, [courseNumber, courseName]);

  return (
    <div>
      <h1 className="yuval">
        {courseName} - {courseNumber}
      </h1>
      <div className="grid-container">
        {reviews &&
          reviews.map((review) => (
            <MyReview
              review={review}
              handleDelete={null}
              isMine={false}
            ></MyReview>
          ))}
      </div>
    </div>
  );
};

export default CoursePage;
