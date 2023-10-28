import StudentNav from '../../common/StudentNav';
import HomePage from './components/HomePage';
import './styles.css';

export default function dashboardstudent() {
  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <StudentNav />
      <HomePage />
    </div>
  );
}
