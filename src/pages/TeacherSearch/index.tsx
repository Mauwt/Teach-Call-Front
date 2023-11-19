import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProfessorApi from '../../api/ProfessorApi';
import TeacherCard from './components/TeacherCard';
import StudentNav from '../../common/StudentNav';
import NoContentCard from './components/NoContentCard';
import './styles.css';

export default function TeacherSearch() {
  const [isContentAvailable, setIsContentAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [content, setContent] = useState([]);

  const { search } = useParams();
  const [professorId] = useSearchParams();
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (professorId.get('professorId')) {
      ProfessorApi.getById(professorId.get('professorId')).then((response) => {
        setContent([response.data]);
        setIsContentAvailable(true);
      });
    } else if (search) {
      ProfessorApi.getAllByCategoryWithPagination(search, currentPage)
        .then((response) => {
          if (response.data.content.length <= 0) {
            setIsContentAvailable(false);
            return;
          }
          setContent(response.data.content);
          setIsLastPage(response.data.last);
          setIsContentAvailable(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      ProfessorApi.getAllWithPagination(currentPage)
        .then((response) => {
          if (response.data.content.length <= 0) {
            setIsContentAvailable(false);
            return;
          }
          setContent(response.data.content);
          setIsLastPage(response.data.last);
          setIsContentAvailable(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentPage, search]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-between "
      style={{ minHeight: '100vh' }}
    >
      <div
        className="nav-bar bg-white"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
        }}
      >
        <StudentNav />
      </div>
      {isContentAvailable && (
        <div className="container mt-5 mb-3 d-flex flex-column flex-grow-1 ">
          <div className="row">
            <div
              className="col-12 col-md-7 mx-auto py-3 px-0  w-75"
              id="teacher-search"
            >
              {content.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  id={teacher.id}
                  firstName={teacher.firstName}
                  lastName={teacher.lastName}
                  description={teacher.description}
                  rating={teacher.rating}
                  reviewCount={teacher.reviewCount}
                  pricePerHour={teacher.pricePerHour}
                />
              ))}
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center mx-auto px-5 mt-auto mb-3 ">
            <div className="col-5 d-flex justify-content-end align-items-center ">
              <button
                type="button"
                className="btn btn-primary"
                disabled={currentPage === 0}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              >
                Anterior
              </button>
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center rounded-5 mx-0 px-3 ">
              <div className="h5">{currentPage + 1}</div>
            </div>
            <div className="col-5 d-flex  align-items-center ">
              <button
                type="button"
                className="btn btn-primary"
                disabled={isLastPage}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
      {!isContentAvailable && <NoContentCard search={search || 'todos'} />}
    </div>
  );
}
