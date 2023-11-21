import NavB from './components/Nav';
import FutureBookings from './components/FutureBookings';
import SideBar from './components/SideBar';
import WeekSchedule from './components/WeekSchedule';
import './styles.css';
import CourseList from './components/CourseList';

export default function TeacherDashboard() {
  return (
    <div
      className="container-fluid g-0 d-flex flex-column "
      style={{ height: '100vh' }}
    >
      <div className="row mx-auto w-100 ">
        <div className="border-bottom d-flex flex-shrink align-items-center justify-content-center">
          <NavB />
        </div>
      </div>
      <div className="row d-flex w-100 h-100 mx-0 flex-fill">
        <div className="d-flex col-12 col-md-2 fake-xxl h-sm-100px px-0 bg-info sticky-top">
          <SideBar />
        </div>
        
        <div
          className="d-flex col-12 col-md-7 col-xl-7 d-flex flex-column pt-1 pe-0"
          style={{ backgroundColor: '#F8F9FA' }}
        >
          <h5 className="mt-5 mb-3 ms-1">Horario Semanal</h5>
          <WeekSchedule />
          <div className="d-flex flex-column flex-grow-1">
           <h5 className="mt-5 mb-3 ms-1"> Mis cursos</h5>
           <CourseList/>
           <a href="" className="btn btn-primary w-50"> Crear curso </a>
          </div>
        </div>
        <div
          className="d-flex col-12 col-md-3  f-fill-xxl flex-column px-0 pt-3 "
          style={{ backgroundColor: '#F8F9FA' }}
        >
          <h5 className="mt-5 mb-3 ms-1">Clases Agendadas</h5>
          <FutureBookings />
        </div>
      </div>
    </div>
  );
}