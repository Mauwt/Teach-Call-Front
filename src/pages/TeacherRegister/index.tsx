import StudentRegisterForm from '../../common/RegisterForm';
import './styles.css';

export default function TeacherRegister() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="d-flex full-h ">
        <div
          className="d-flex flex-column flex-grow-0 justify-content-center px-4"
          style={{ backgroundColor: '#D7F5F9' }}
        >
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <div className="d-flex align-items-center">
            <div className="ms-1 me-3 ">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 48, color: '#F0AA07' }}
              >
                how_to_reg
              </span>
            </div>
            <div className="flex-column justify-content-center align-items center">
              <p className="fw-bolder pb-0 mb-0">Conecta con Estudiantes</p>
              <p>Podrás conectar con estudiantes de cualquier parte del país</p>
            </div>
          </div>
          <div className="d-flex align-items-center ">
            <div className="ms-1 me-3 ">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 48, color: '#F0AA07' }}
              >
                payments
              </span>
            </div>
            <div className="flex-column justify-content-center align-items center my-3">
              <p className="fw-bolder pb-0 mb-0">Define tus tarifas</p>
              <p>Cobra lo que tu experiencia y capacidad merecen. </p>
            </div>
          </div>
          <div className="d-flex align-items-center ">
            <div className="ms-1 me-3 ">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 48, color: '#F0AA07' }}
              >
                post_add
              </span>
            </div>
            <div className="flex-column justify-content-center align-items center">
              <p className="fw-bolder pb-0 mb-0">Crea tu comunidad</p>
              <p>
                Da a conocer tus conocimientos en nuestra sección{' '}
                <b>comunidad</b>
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-grow-1 mx-0 px-0">
          <div className="full-h d-flex flex-column justify-content-center align-items-center">
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
              Hacemos la conexión entre tu experiencia y la motivación de
              nuestros alumnos
            </p>

            <StudentRegisterForm userRole="teacher" />
          </div>
        </div>
      </div>
    </>
  );
}
