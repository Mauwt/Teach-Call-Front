import { useState } from 'react';
import FutureClasses from './FutureClasses';
import StudentSideBar from './SideBar';
import TopCourses from './TopCourses';
import StudentFeed from '../../StudentFeed';

export default function HomePage() {
  const [showCourses, setShowCourses] = useState(true);
  return (
    <div className="d-flex flex-grow-1">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="container-fluid overlflow-hidden">
        <div className="row h-100 overflow-auto">
          <div className="d-flex col-12 col-md-2  fake-xxl h-sm-100px px-0 bg-info sticky-top">
            <StudentSideBar setShowCourses={setShowCourses} />
          </div>
          <div
            className="d-flex col-12 col-md-7 col-xl-8 flex-column pt-1 pe-0 pe-5"
            style={{ backgroundColor: '#F8F9FA' }}
          >
            {showCourses && (
              <>
                <div className="categories d-flex flex-column flex-grow-1 mt-1 pt-2 px-0 ">
                  <h3 className="" style={{ color: 'black' }}>
                    Cursos populares
                  </h3>
                  <div className="d-flex flex-wrap justify-content-space-around mt-2 ">
                    <TopCourses />
                  </div>
                </div>
                <div className="course d-flex flex-grow-1 p-2 ">
                  <h3 style={{ color: 'black' }}>Mis cursos</h3>
                </div>
              </>
            )}
            {!showCourses && <StudentFeed />}
          </div>
          <div
            className="d-flex col-12 col-md-3  f-fill-xxl flex-column px-0 pt-3"
            style={{ backgroundColor: '#F8F9FA' }}
          >
            <h5 className="mt-0 mb-3 ms-1">Clases Agendadas</h5>
            <FutureClasses />
          </div>
        </div>
      </div>
    </div>
  );
}
