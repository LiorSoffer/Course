import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import MyReview from "../components/MyReview";

const Profile = () => {
  const [reviews, setReviews] = useState(null);
  const { user } = useAuthContext();

  const fetchReviews = useCallback(async () => {
    const response = await fetch("https://course-server-cf4deh2uv-liors-projects-6316a22e.vercel.app/api/reviews/user/" + user.email);
    const json = await response.json();
    if (response.ok) {
      setReviews(json);
    }
  }, [user.email]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (review) => {
    if (!user) {
      return;
    }

    const response = await fetch("https://course-server-cf4deh2uv-liors-projects-6316a22e.vercel.app/reviews/" + review._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      fetchReviews();
    }
  };

  return (
    <div>
      <h1 className="yuval">
        Hello {user.email.substring(0, user.email.indexOf("@")).toUpperCase()}
      </h1>

      {reviews === null ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <div className="grid-container">
          {reviews &&
            reviews.map((review) => (
              <MyReview
                review={review}
                handleDelete={handleDelete}
                isMine={true}
              ></MyReview>
            ))}
        </div>
      )}
    </div>
  );
};
export default Profile;
