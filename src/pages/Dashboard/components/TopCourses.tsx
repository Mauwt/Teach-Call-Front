import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseApi from '../../../api/CourseApi';
import { TopCourseRes } from '../../../api/types/Course';

function TopCourseCard(prop: TopCourseRes) {
  return (
    <Link
      to="/course"
      state={{ id: prop.id }}
      className="rounded-1 mx-3 my-2 px-2 pt-2 d-flex flex-column bg-info w-25 text-decoration-none"
    >
      <div className="d-flex justify-content-space-between">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <div>
          <h5
            className="w-75 text-line-break text-decoration-none"
            style={{ fontSize: '24px', color: 'black' }}
          >
            {prop.title}
          </h5>
        </div>
        <div
          className="mx-auto flex-fill d-flex justify-content-end"
          style={{ minHeight: '50px' }}
        >
          <span
            className="material-symbols-outlined me-2"
            style={{ color: 'yellow', fontSize: 30 }}
          >
            social_leaderboard
          </span>
          <p className="mt-1" style={{ color: '#f5f5f5' }}>
            {prop.rating.toPrecision(2)}
          </p>
        </div>
      </div>
      <p className="text-muted">{prop.firstName}</p>
    </Link>
  );
}

export default function TopCourses() {
  const [courses, setCourses] = useState<TopCourseRes[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      const topFiveCourses = await CourseApi.getTopFiveCourses();
      setCourses(topFiveCourses.data);
    }

    fetchCourses();
  }, []);

  return (
    <>
      {courses.map((course) => (
        <TopCourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          rating={course.rating}
          firstName={course.firstName}
        />
      ))}
    </>
  );
}
