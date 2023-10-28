import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import loginHandleSubmit from '../utils/handleLoginSubmit';
import { UserAuthContext } from '../context/UserAuthContext';

interface Props {
  userRole: string;
}

export default function LoginForm({ userRole }: Props) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserAuthContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      loginHandleSubmit(e, userRole, navigate, setUser);
    } catch (error) {
      console.log(error);
    }
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
              htmlFor="email"
            >
              Email
              <input
                type="email"
                id="email"
                name="email"
                className="form-control w-75"
                required
              />
            </label>
          </div>

          <div className="form-outline mb-4 d-flex flex-column justify-content-center">
            <label className="form-label" htmlFor="password">
              Contraseña
              <input
                type="password"
                id="password"
                name="password"
                className="form-control w-75"
                required
              />
            </label>
            <div className="login-error d-none w-75 text-dark bg-danger px-2 py-1 rounded">
              {' '}
            </div>
          </div>

          <button
            className="text-dark mx-auto my-4 btn btn-info btn-block mb-4 "
            type="submit"
            style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            {' '}
            Login
          </button>

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
