import { Link } from 'react-router-dom';

export default function LoginOptions() {
  return (
    <div
      className="container-fluid flex-grow-1 px-0"
      // style={{ height: '100%' }}
    >
      <div className="row g-0" style={{ height: '100%' }}>
        <div className="tutor tutor-bg col-lg-6 col-md-6-col-sm-12 d-flex justify-content-center align-items-center">
          <div
            className="d-flex flex-column justify-content-center w-50 px-2"
            style={{ minHeight: '20px' }}
          >
            <h2 className="text-center" style={{ fontWeight: 350 }}>
              Para
              <em style={{ fontStyle: 'normal', fontWeight: 500 }}>
                {' '}
                Tutores{' '}
              </em>
            </h2>
            <p
              className="text-center my-4"
              style={{
                fontSize: '18px',
                lineHeight: '24px',
                fontWeight: '300',
              }}
            >
              Facilitamos la unión de tu experiencia educativa con el talento
              emergente en el ámbito académico y profesional
            </p>
            <p
              className="d-flex justify-content-center rounded border border-info bg-info mt-2 mb-2 mx-auto"
              style={{ width: '100px' }}
            >
              <Link
                className="text-dark mx-4 my-2"
                to="/teacher-login"
                role="button"
                tabIndex={0}
                style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
              >
                Login
              </Link>
            </p>
            <div className="create_account-bottom mx-auto mt-5 text-center">
              ¿ Deseas aplicar al equipo de tutores ?
              <br />
              <Link to="/">Sign up</Link>.
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6-col-sm-12 d-flex justify-content-center align-items-center rounded-4">
          <div
            className="d-flex flex-column justify-content-center px-2 w-50"
            style={{ minHeight: '20px' }}
          >
            <h2 className="text-center" style={{ fontWeight: 350 }}>
              Para
              <em style={{ fontStyle: 'normal', fontWeight: 500 }}>
                {' '}
                Estudiantes{' '}
              </em>
            </h2>
            <p
              className="text-center my-4"
              style={{
                fontSize: '18px',
                lineHeight: '24px',
                fontWeight: '300',
              }}
            >
              Conecta con tutores expertos en las áreas que necesitas, y
              aprovecha las oportunidades que te brinda la comunidad
            </p>
            <p
              className="d-flex justify-content-center rounded border mt-2 mb-2 mx-auto"
              style={{ width: '100px' }}
            >
              <Link
                className="text-dark mx-4 my-2"
                to="/student-login"
                role="button"
                tabIndex={0}
                style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
              >
                Login
              </Link>
            </p>
            <div className="create_account-bottom mx-auto mt-5 text-center">
              ¿ Aún no tienes una cuenta ?
              <br />
              <Link to="/student-register">Sign up</Link>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
