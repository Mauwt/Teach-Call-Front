import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthApi from '../api/AuthApi';
import SearchBar from './SearchBar';

function StickyNav() {
  const isAuthenticated = AuthApi.isAuthenticated();
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Navbar sticky="top" expand="lg" className="flex-shrink-1">
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
          <Link to="/student-premiun">
            <button
              type="button"
              className="btn btn-outline-warning px-0 py-0 "
              style={{ fontSize: 13, width: 100, height: 30 }}
            >
              Obten Premiun
            </button>
          </Link>
          <SearchBar />
        </Container>
      </Navbar>
    </>
  );
}

export default StickyNav;
