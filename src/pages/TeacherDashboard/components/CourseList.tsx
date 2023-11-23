import { useState, useEffect } from 'react';
import CourseApi from '../../../api/CourseApi';

type CourseData = {
  id: number;
  title: string;
  description: string;
};

export default function CourseList() {
  const [courses, setCourses] = useState<Array<CourseData>>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CourseApi.getAllByTeacherEmail();
        setCourses(response.data.slice(0, 3));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div
      className="bookings d-flex flex-column flex-grow-2 rounded overflow-auto pe-2 me-3 border-bottom"
      style={{ height: '450px', backgroundColor: '#F8F9FA' }}
    >
      {courses &&
        courses.map((course) => (
          <div className="card p-2 m-1" key={course.id}>
            <p>{course.title}</p>
            <p>{course.description}</p>
          </div>
        ))}
    </div>
  );
}
