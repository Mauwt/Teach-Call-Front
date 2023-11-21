import './styles.css';
import { useLocation } from 'react-router-dom';

export default function TeacherAvailability() {
  const location = useLocation();

  const { teacherId } = location.state;
  return <div className="h1">Hola{teacherId}</div>;
}
