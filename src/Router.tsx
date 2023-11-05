import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import Register from './pages/Register';
import TeacherLogin from './pages/TeacherLogin';
import TeacherRegister from './pages/TeacherRegister';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProfessorTour from './pages/ProfessorTour';
import TeacherDashboard from './pages/TeacherDashboard';

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas de acceso publico */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-register" element={<StudentRegister />} />
      <Route path="/teacher-login" element={<TeacherLogin />} />
      <Route path="/teacher-register" element={<TeacherRegister />} />
      <Route path="/dashboard/student" element={<Dashboard />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard />} />

      {/* Rutas de acceso unico a ESTUDIANTES */}
      <Route element={<ProtectedRoute rol="student" redirectTo="/login" />} />

      {/* Rutas de acceso unico a PROFESORES */}
      <Route element={<ProtectedRoute rol="teacher" redirectTo="/login" />}>
        <Route path="/professor-tour" element={<ProfessorTour />} />
      </Route>
    </Routes>
  );
}
