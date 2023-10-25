import { Link } from 'react-router-dom';
import { LoginReq } from '../types/Auth';
// import { validateLoginForm } from '../utils/validateLoginForm';
// import { AuthApi } from '../api/AuthApi';

interface Props {
  userRole: string;
}

export default function LoginForm({ userRole }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: LoginReq = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    // const errors: Map<string, string> = validateLoginForm(data);s
    console.log(data); 
  };

  return (
    <div className="main pt-0 w-25 ">
      <div
        className="tabs d-flex flex-row align-items-center"
        role="navigation"
      >
        <Link
          to={
            userRole === 'student' ? '/student-register' : '/teacher-register'
          }
          className="register-tab d-flex w-50 justify-content-center text-decoration-none py-2"
        >
          Sign Up
        </Link>
        <Link
          to={userRole === 'student' ? '/student-login' : '/teacher-login'}
          className="login-tab active d-flex w-50 justify-content-center text-decoration-none py-2"
        >
          Log In
        </Link>
      </div>
      <div className="login-form ">
        <form className="p-4 mt-0 d-flex flex-column" onSubmit={handleSubmit}>
          <div
            className="form-outline mb-4 d-flex flex-column justify-content-center"
            style={{ width: '100%' }}
          >
            <label
              className="form-label d-flex flex-column justify-content-center"
              htmlFor="form2Example1"
            >
              Email
              <input
                type="email"
                id="form2Example1"
                className="form-control w-75"
                required
              />
            </label>
          </div>

          <div className="form-outline mb-4 d-flex flex-column justify-content-center">
            <label className="form-label" htmlFor="form2Example2">
              Contraseña
              <input
                type="password"
                id="form2Example2"
                className="form-control w-75"
                required
              />
            </label>
          </div>

          {/* <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <label
                  className="form-check-label"
                  htmlFor="form2Example31"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Remember me
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form2Example31"
                    checked
                  />
                </label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div> */}
          <input
            className="text-dark mx-auto my-4 btn btn-info btn-block mb-4 "
            type="submit"
            style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
            value="Login"
          />

          <div className="text-center mt-3">
            <p>
              ¿Aún no tienes una cuenta ?
              <br />
              <Link to="/student-register">Registrarse</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
