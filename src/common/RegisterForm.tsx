import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import registerHandleSubmit from '../utils/handleRegisterSubmit';
import { UserAuthContext } from '../context/UserAuthContext';

interface Props {
  userRole: string;
}

export default function StudentRegisterForm({ userRole }: Props) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserAuthContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      registerHandleSubmit(e, userRole, navigate, setUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main pt-0 w-25">
      <div
        className="tabs d-flex flex-row align-items-center"
        role="navigation"
      >
        <Link
          to={
            userRole === 'student' ? '/student-register' : '/teacher-register'
          }
          className="register-tab active d-flex w-50 justify-content-center text-decoration-none py-2"
        >
          Sign Up
        </Link>
        <Link
          to={userRole === 'student' ? '/student-login' : '/teacher-login'}
          className="login-tab d-flex w-50 justify-content-center text-decoration-none py-2"
        >
          Log In
        </Link>
      </div>
      <div className="register-form">
        <form className="p-4 mt-0 d-flex flex-column" onSubmit={handleSubmit}>
          <div
            className="form-outline mb-2 d-flex flex-column justify-content-center"
            style={{ width: '100%' }}
          >
            <label
              className="form-label d-flex flex-column justify-content-center"
              htmlFor="user_name"
            >
              Nombres
              <input
                type="text"
                id="user_name"
                name="user_name"
                className="form-control w-75"
                required
              />
            </label>
            <div className="error firstName-error d-none w-75 text-dark bg-danger px-2 py-1 rounded">
              {' '}
            </div>
          </div>
          <div className="form-outline mb-2 d-flex flex-column justify-content-center">
            <label
              className="form-label d-flex flex-column justify-content-center"
              htmlFor="user_last_name"
            >
              Apellidos
              <input
                type="text"
                id="user_last_name"
                name="user_last_name"
                className="form-control w-75"
                required
              />
            </label>
            <div className="error lastName-error d-none w-75 text-dark bg-danger px-2 py-1 rounded">
              {' '}
            </div>
          </div>

          <div className="form-outline mb-2">
            <label
              className="form-label d-flex flex-column justify-content-center"
              htmlFor="user_email"
            >
              Email
              <input
                type="email"
                id="user_email"
                name="email"
                className="form-control w-75"
                required
              />
            </label>
            <div className="error email-error d-none w-75 text-dark bg-danger px-2 py-1 rounded">
              {' '}
            </div>
          </div>

          <div className="form-outline mb-2 d-flex flex-column justify-content-center">
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
            <div className="error password-error d-none w-75 text-dark bg-danger px-2 py-1 rounded">
              {' '}
            </div>
          </div>

          <button
            className="text-dark mx-auto my-2 btn btn-info btn-block mb-4 "
            type="submit"
            style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
