import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthApi from '../../../api/AuthApi';

function NavB() {
  const isAuthenticated = AuthApi.isAuthenticated();
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Navbar sticky="top" expand="lg" className="">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center justify-content-center">
            <Link
              to={isAuthenticated ? '/dashboard/teacher' : '/'}
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
        </Container>
      </Navbar>
    </>
  );
}

export default NavB;
