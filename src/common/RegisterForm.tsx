import { Link } from 'react-router-dom';

interface Props {
  userRole: string;
}

export default function StudentRegisterForm({ userRole }: Props) {
  /* eslint-disable-next-line */
  console.log(userRole);
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
        <form className="p-4 mt-0 d-flex flex-column">
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
                type="email"
                id="user_name"
                className="form-control w-75"
                required
              />
            </label>
          </div>
          <div className="form-outline mb-2 d-flex flex-column justify-content-center">
            <label
              className="form-label d-flex flex-column justify-content-center"
              htmlFor="user_last_name"
            >
              Apellidos
              <input
                type="email"
                id="user_last_name"
                className="form-control w-75"
                required
              />
            </label>
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
                className="form-control w-75"
                required
              />
            </label>
          </div>

          <div className="form-outline mb-2 d-flex flex-column justify-content-center">
            <label className="form-label" htmlFor="password">
              Contraseña
              <input
                type="password"
                id="password"
                className="form-control w-75"
                required
              />
            </label>
          </div>

          <Link
            className="text-dark mx-auto my-2 btn btn-info btn-block mb-4 "
            to="/"
            role="button"
            tabIndex={0}
            style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}
