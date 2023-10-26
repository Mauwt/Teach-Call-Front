import { Link } from 'react-router-dom';
import FutureClasses from './FutureClasses';

export default function HomePage() {
  return (
    <div className="d-flex flex-grow-1">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className="container-fluid p-0">
        <div className="row d-flex w-100 h-100 p-0 g-0">
          <div className="col-3 border rounded bg-light-subtle d-flex flex-column">
            <div className="d-flex flex-column flex-grow-2">
              <ul
                className="d-flex flex-column pt-5"
                style={{ listStyle: 'none', color: 'white' }}
              >
                <li
                  className="d-flex align-items-center my-3 rounded w-50 px-2 py-1"
                  style={{ backgroundColor: 'rgb(17,17,17,0.07)' }}
                >
                  <span
                    className="material-symbols-outlined me-3"
                    style={{
                      color: 'black',
                    }}
                  >
                    space_dashboard
                  </span>
                  <Link
                    to="/dashboard/student"
                    className="w-100 text-decoration-none text-dark"
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="d-flex align-items-center my-2">
                  <span
                    className="material-symbols-outlined me-3"
                    style={{ color: 'black' }}
                  >
                    draw
                  </span>
                  <Link to="/#" className="w-50 text-decoration-none text-dark">
                    Notes
                  </Link>
                </li>

                <li className="d-flex align-items-center my-4">
                  <span
                    className="material-symbols-outlined me-3"
                    style={{ color: 'black' }}
                  >
                    comment_bank
                  </span>
                  <Link to="/#" className="w-50 text-decoration-none text-dark">
                    Chats
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6 ">sdafd</div>
          <div className="col-3 d-flex flex-column px-2 pt-3  border rounded">
            <h5 className="mt-2 mb-3 ms-2">Clases Agendadas</h5>
            <FutureClasses />
          </div>
        </div>
      </div>
    </div>
  );
}
