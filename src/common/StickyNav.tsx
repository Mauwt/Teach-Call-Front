import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthApi from '../api/AuthApi';

function StickyNav() {
  const isAuthenticated = AuthApi.isAuthenticated();
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center justify-content-center">
            <Link
              to={isAuthenticated ? '/dashboard/student' : '/'}
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <div
                className="me-1 d-flex align-items-center"
                style={{ height: '100%' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#6A9BD2' }}
                >
                  school
                </span>
              </div>
              TeachCall
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse className="justify-content-end" id="navbarScroll">
            <ul
              className="d-block d-sm-flex list-group flex-row align-items-center  "
              style={{ whiteSpace: 'nowrap', listStyle: 'none' }}
            >
              <li
                className="d-sm-flex my-2 mx-1 py-1 px-3 text-dark border border-black rounded"
                style={{ maxWidth: '100px', cursor: 'pointer' }}
              >
                <Link
                  className="text-dark"
                  to="/login"
                  role="button"
                  tabIndex={0}
                  style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
                >
                  Log in
                </Link>
              </li>
              <li
                className="d-sm-flex my-2 mx-1 py-1 px-3 border rounded bg-info border-info"
                style={{ maxWidth: '100px' }}
              >
                <Link
                  className="text-dark"
                  to="/register"
                  role="button"
                  tabIndex={0}
                  style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default StickyNav;
