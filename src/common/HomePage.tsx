import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Left Section */}
      <div style={{ flex: 1, backgroundColor: 'lightgray' }}>
        {/* Content for the left section goes here */}
      </div>

      {/* Middle Section */}
      <div style={{ flex: 2, backgroundColor: 'lightblue' }}>
        <p>text</p>
        {/* Content for the middle section goes here */}
      </div>

      {/* Right Section */}
      <div style={{ flex: 1, backgroundColor: 'lightgreen' }}>
        {/* Content for the right section goes here */}
      </div>
    </div>
  );
}
