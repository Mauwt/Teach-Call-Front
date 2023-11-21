import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserAuthContext } from '../../../context/UserAuthContext';
import logoutHandleSubmit from '../../../utils/logOutOnClick';

export default function StudentSideBar() {
  const { user, setUser } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    try {
      logoutHandleSubmit(setUser, navigate);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-md-column flex-grow-1 align-items-center align-items-md-start px-3 pt-0 text-white">
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
      <ul
        className="nav nav-pills flex-md-column flex-row flex-nowrap flex-shrink-1 flex-md-grow-0 flex-grow-1 mb-md-auto mb-0 mt-0 mt-md-3 justify-content-center align-items-center align-items-md-start"
        id="menu"
      >
        <li className="nav-item mt-2 mb-1">
          <Link
            to="/dashboard/teacher"
            className="nav-link px-md-0 px-2 d-flex align-items-center justify-content-center"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 30 }}
            >
              calendar_month
            </span>
            <span className="ms-1 pt-1 d-none d-md-inline text-dark">
              Mis horarios
            </span>
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link
            to="/comunidad"
            className="nav-link px-md-0 px-2 d-flex align-items-center justify-content-center"
          >
            <span
              className="material-symbols-outlined"
              style={{ color: 'black', fontSize: 30 }}
            >
              groups
            </span>
            <span className="ms-1 pt-1 d-none d-md-inline text-dark">
              Comunidad
            </span>
          </Link>
        </li>
      </ul>
      <div className="dropdown py-md-4 mt-md-auto ms-auto ms-md-2 flex-shrink-1">
        <a
          href="/#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          role="button"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="hugenerd"
            width="35"
            height="35"
            className="rounded-circle"
          />
          <span className="d-none d-md-inline mx-1">{user?.firstName}</span>
        </a>
        <ul
          className="dropdown-menu text-small shadow my-0"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" href="/#">
              Settings
            </a>
          </li>
          <li>
            <Link to="/change-password">
              Change Password
            </Link>
          </li>
          <li>
            <Link to="/profile/teacher" className="dropdown-item">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item"
              onClick={handleLogOut}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
