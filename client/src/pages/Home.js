import { useEffect, useState } from "react";
import CourseDetails from "../components/CourseDetails";
import ReviewForm from "../components/ReviewForm";

const Home = () => {
  const [courses, setCourses] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(null);
  const [sort, setSort] = useState("");
  let url =
    "https://course-server-jnen0jhd4-liors-projects-6316a22e.vercel.app/";

  const fetchCourses = async () => {
    const response = await fetch(url + " app/api/reviews/courses/");
    const json = await response.json();

    if (response.ok) {
      setCourses(json);
      setFilteredCourses(json);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSort("");
    const filteredCourses2 = courses
      ? courses.filter((course) =>
          course.courseName
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase())
        )
      : [];
    setFilteredCourses(filteredCourses2);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    const sortedCourses = [...filteredCourses];
    sortedCourses.sort((a, b) => {
      const A = parseFloat(a[e.target.value]);
      const B = parseFloat(b[e.target.value]);

      if (A < B) return 1;
      if (A > B) return -1;
      return 0;
    });

    setFilteredCourses(sortedCourses);
  };

  return (
    <>
      <div className="home">
        <div>
          <h3>All Courses</h3>
          <div className="search-sort-container">
            <select value={sort} onChange={handleSort}>
              <option value="" disabled selected>
                Sort By
              </option>
              <option value="hardGrade">Industry Relevance</option>
              <option value="interestGrade">Interest</option>
              <option value="effortGrade">Effort</option>
              <option value="totalGrade">Total Grade</option>
            </select>

            <input
              className="text"
              type="text"
              placeholder="Search courses by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {filteredCourses ? (
            filteredCourses.map((course) => (
              <CourseDetails course={course} key={course._id} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <ReviewForm fetchCourses={fetchCourses} courses={courses} />
      </div>
    </>
  );
};

export default Home;
