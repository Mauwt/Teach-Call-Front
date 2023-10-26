import StudentNav from '../../common/StudentNav';
import HomePage from './components/HomePage';

export default function dashboardstudent() {
  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <StudentNav />
      <HomePage />
    </div>
  );
}
