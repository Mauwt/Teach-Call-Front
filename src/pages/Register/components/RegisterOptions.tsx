import { Link } from 'react-router-dom';

export default function RegisterOptions() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="main-container d-flex flex-column justify-content-center align-items-center w-100 p-3 flex-grow-1">
        <div className="row w-100 ">
          <div className="col-sm-10 col-md-8 p-0 mx-auto">
            <div className="register-options-card p-0 mx-auto border rounded-4 d-block d-sm-flex">
              <div className="register-title container m-0 py-2 text-dark text-center bg-info d-flex flex-column">
                <div className="logo-container d-flex align-items-center m-0 rounded-4 pt-2 ps-2">
                  <span
                    className="material-symbols-outlined"
                    style={{ color: 'black', fontSize: 40 }}
                  >
                    school
                  </span>
                </div>
                <div className="d-flex flex-column justify-content-center text-white">
                  <h2 className="mx-auto mt-5 mb-4">Bienvenido</h2>
                  <div className="w-75  rounded-4 mx-auto text-center mb-3">
                    <p
                      className="m-0 mb-3 p-0 text-center"
                      style={{ lineHeight: '30px' }}
                    >
                      ¿Ya eres parte de nuestra comunidad?
                      <br />
                      Inicia sesión aquí para continuar tu experiencia en
                      TeachCall
                      <br />
                    </p>
                    <Link
                      to="/login"
                      className="text-decoration-none login-bt py-2 px-4"
                    >
                      Inicia sesión
                    </Link>
                  </div>
                </div>
              </div>
              <div className="container d-flex flex-column justify-content-center px-0 py-3">
                <div className="row mx-auto py-3">
                  <h5 className="text-center text-dark mt-3">
                    ¿Qué tipo de cuenta deseas crear?
                  </h5>
                </div>
                <div className="row mx-auto w-100 d-flex flex-column justify-content-center">
                  <div className="link col-sm-10 col-md-8 d-flex flex-column w-75 mx-auto my-4">
                    <Link
                      to="/teacher-register"
                      className="w-100 my-2 text-decoration-none text-black "
                    >
                      <img
                        width="35rem"
                        src="https://img.icons8.com/ios/50/teacher.png"
                        alt="teacher"
                        className="mb-1 me-3"
                      />
                      <b>Soy profesor</b>
                      <p style={{ fontSize: 14 }}>
                        Comparte tu conocimiento, publica contenido y gana
                        dinero
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="row mx-auto w-100 d-flex flex-column justify-content-center">
                  <div className="link col-sm-10 col-md-8 d-flex flex-column w-75 mx-auto my-4">
                    <Link
                      to="/student-register"
                      className=" w-100 my-2 text-decoration-none text-black"
                    >
                      <img
                        width="35"
                        src="https://img.icons8.com/external-those-icons-lineal-those-icons/48/external-Student-school-and-education-those-icons-lineal-those-icons-2.png"
                        alt="external-Student-school-and-education-those-icons-lineal-those-icons-2"
                        className="mb-1 me-3"
                      />
                      <b>Soy Estudiante</b>
                      <p style={{ fontSize: 14 }}>
                        Encuentra tutores de manera rápida y sencilla en la
                        materia que necesites
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
