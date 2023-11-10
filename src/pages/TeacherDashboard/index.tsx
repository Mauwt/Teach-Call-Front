import SideBar from './components/SideBar';
import WeekSchedule from './components/WeekSchedule';
import './styles.css';

export default function TeacherDashboard() {
  return (
    <div className="container-fluid g-0 " style={{ height: '100vh' }}>
      <div className="row d-flex w-100 h-100 mx-0">
        <div className="d-flex col-12 col-md-2 fake-xxl h-sm-100px px-0 bg-info sticky-top">
          <SideBar />
        </div>
        <div
          className="d-flex col-12 col-md-7 col-xl-8 flex-column pt-1 pe-0"
          style={{ backgroundColor: '#F8F9FA' }}
        >
          <WeekSchedule />
        </div>
      </div>
    </div>
  );
}
