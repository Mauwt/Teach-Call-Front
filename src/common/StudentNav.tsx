import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function StickyNav() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Navbar sticky="top" expand="lg" className="">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center justify-content-center">
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
            <Link
              to="/"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              TeachCall
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown title="Estudiantes" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">
                  Obten Premiun
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Recursos Gratuitos
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <SearchBar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default StickyNav;
