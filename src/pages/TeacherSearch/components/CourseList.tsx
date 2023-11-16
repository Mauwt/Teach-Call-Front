import { useEffect, useState } from 'react';
import { set } from 'date-fns';
import CourseApi from '../../../api/CourseApi';

type CourseListProps = {
  teacherId: number;
  setSelectedCourseId?: (id: number) => void;
};

export default function CourseList(prop: CourseListProps) {
  const [content, setContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isContentAvailable, setIsContentAvailable] = useState(false);

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const response = await CourseApi.getAllByTeacherId(
          prop.teacherId,
          currentPage
        );
        setContent(response.data.content);
        setIsLastPage(response.data.last);
        setIsContentAvailable(true);

        console.log(content);
      } catch (error) {
        console.log(error);
        setIsContentAvailable(false);
      }
    };
    getCourseList();
  }, [prop.teacherId, currentPage]);

  const handleCheckboxChange = (event) => {
    // Unchecke every other checked input and check the current target

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked && checkbox !== event.currentTarget) {
        checkbox.checked = false;
      }
    });
    event.currentTarget.checked = true;
    prop.setSelectedCourseId(event.currentTarget.id.split('-')[1]);
    console.log(event.currentTarget.id.split('-')[1]);
  };

  return (
    <div className="d-flex flex-column ">
      {isContentAvailable &&
        content.map((course) => (
          <label htmlFor={`course-${course.id}`} key={course.id}>
            <input
              type="checkbox"
              id={`course-${course.id}`}
              name={`course-${course.id}-checkbox"`}
              value={course.title}
              className="form-check-input rounded-5 me-3"
              onClick={handleCheckboxChange}
            />
            {course.title}
          </label>
        ))}
      {isLastPage ? (
        <button
          type="button"
          className="btn btn-outline-primary mt-4 w-25 align-self-end"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled
        >
          Cargar más
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Cargar más
        </button>
      )}
    </div>
  );
}
