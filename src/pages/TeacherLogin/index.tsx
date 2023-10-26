import LoginForm from '../../common/LoginForm';
import './styles.css';

export default function TeacherLogin() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div
        className="d-flex flex-column justify-content-center align-items-center p-4"
        style={{ height: '100vh' }}
      >
        <div className="d-flex flex-row justify-content-center align-items-center mx-auto text-center">
          <div className="me-1 d-flex align-items-center justify-content-center">
            <span
              className="material-symbols-outlined"
              style={{ color: '#627389', fontSize: '48px' }}
            >
              school
            </span>
          </div>
          <h1 className="text-center">TeachCall</h1>
        </div>
        <h3 className="text-center mt-3" style={{ fontWeight: 350 }}>
          Para
          <em style={{ fontStyle: 'normal' }}> Tutores </em>
        </h3>
        <p className="mb-5 mt-3">
          Hacemos la conexión entre tu experiencia y la motivación de nuestros
          alumnos
        </p>
        <LoginForm userRole="teacher" />
      </div>
    </>
  );
}
