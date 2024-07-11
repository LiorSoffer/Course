const MyReview = ({ review, handleDelete, isMine }) => {
  const renderStars = (grade) => {
    let stars = [];
    for (let index = 0; index < 5; index++) {
      if (index < grade)
        stars.push(<span key={index} className="fa fa-star checked"></span>);
    }
    return stars;
  };

  return (
    <div className="card" id={review._id} key={review._id}>
      {isMine ? (
        <span
          onClick={() => handleDelete(review)}
          className="delete-icon material-symbols-outlined"
          style={{ cursor: "pointer" }}
        >
          delete
        </span>
      ) : (
        <></>
      )}
      {isMine ? (
        <h2>Course: {review.courseName}</h2>
      ) : (
        <h2>
          {review.nickname.split("@")[0].toUpperCase()} - Rate:{" "}
          {renderStars(review.grade)}
        </h2>
      )}

      <p>
        <b>Year:</b> {review.year} / {review.semester}
        {"    "}
        <b>Lecturer:</b> {review.lecturer}
      </p>
      <p>
        <b>Industry Relevance:</b> {renderStars(review.hard)}
      </p>
      <p>
        <b>Interest:</b> {renderStars(review.intrest)}
      </p>
      <p>
        <b>Effort:</b> {renderStars(review.effort)}
      </p>
      <p>{review.comment}</p>
    </div>
  );
};

export default MyReview;
