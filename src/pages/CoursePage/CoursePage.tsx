import './styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import StudentNav from '../../common/StudentNav';

type Professor = {
  id: number;
  lastName: string;
  firstName: string;
};

type Education = {
  id: number;
  degree: string;
  schoolName: string;
  startDate: string;
  endDate: string;
};

type CourseResponse = {
  rating: number;
  id: number;
  title: string;
  description: string;
  price: number;
  professor: Professor;
  educations: Education[];
};

export default function CoursePage() {
  const [course, setCourse] = useState<CourseResponse>();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        const { id } = location.state;
        const response = await CourseApi.getCourseFullInfo(id);
        setCourse(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourseInfo();
    console.log(course);
  }, []);

  const onClick = () => {
    navigate(`/search/teacher?professorId=${course?.professor.id}`);
  };

  return (
    course && (
      <div
        className="container rounded-5 d-flex flex-column justify-content-center align-items-center "
        style={{ height: '100vh' }}
      >
        <div
          className="row w-100 "
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
          }}
        >
          <StudentNav />
        </div>
        <div className="row w-100">
          <div className="col-12 col-md-12">
            <div className="d-flex w-75 mx-auto">
              <div className="d-flex flex-column w-50 border-end ms-2 ps-4 pe-0 py-5 bg-info rounded-start-5">
                <div className="stars d-flex align-items-center">
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                  />
                  <h1 className="me-4">{course?.title}</h1>
                  {Array.from(Array(Math.ceil(course?.rating)).keys()).map(
                    (i) => (
                      <span
                        key={`star-prop.id-${i}`}
                        className="material-symbols-outlined d-inline"
                        style={{ color: '#F0AA07' }}
                      >
                        star_rate
                      </span>
                    )
                  )}
                </div>
                <div className="w-75 text-wrap">
                  <p>{course.description}</p>
                </div>
                <div className="d-flex flex-column w-75 justify-content-center ">
                  <h4>Profesor</h4>
                  <div className="d-flex">
                    <img
                      src="https://picsum.photos/80"
                      alt="profile pic"
                      width={80}
                      height={80}
                      className="img rounded-5 border border-1 border-dark me-3 "
                    />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <p>
                        {course.professor?.firstName}{' '}
                        {course.professor.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column w-50 border border-2 border-info ps-4 pe-0 py-5 ms-0 rounded-end-5 overflow-auto">
                <h3 style={{ fontWeight: 900 }} className="mb-3">
                  ¿Quien te enseñará?
                </h3>
                <h5>Educacion</h5>
                <div className="d-flex flex-column m-3 border py-3 px-2 rounded-5">
                  {course.educations?.map((education) => (
                    <div
                      className="d-flex flex-column border-bottom"
                      key={education.id}
                    >
                      <p className="mb-1">
                        {' '}
                        Titulo de {education.degree} en {education.schoolName}
                      </p>
                      <p
                        style={{ fontSize: '14px' }}
                        className="text-muted mt-0 mb-1"
                      >
                        desde {education.startDate} hasta {education.endDate}
                      </p>
                    </div>
                  ))}
                </div>
                <h5>Experiencia</h5>
                <div className="d-flex flex-column m-3 border py-3 px-2 rounded-5">
                  {course.educations?.map((education) => (
                    <div
                      className="d-flex flex-column border-bottom"
                      key={education.id}
                    >
                      <p className="mb-1">
                        {' '}
                        Titulo de {education.degree} en {education.schoolName}
                      </p>
                      <p
                        style={{ fontSize: '14px' }}
                        className="text-muted mt-0 mb-1"
                      >
                        desde {education.startDate} hasta {education.endDate}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-50 mx-auto"
                  onClick={onClick}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
