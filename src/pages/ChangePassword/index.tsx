import { useState } from 'react';
import React, { ComponentType } from 'react';
import './style.css';
import ProfessorApi from '../../api/ProfessorApi';
import NavB from '../TeacherDashboard';

import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserAuthContext } from '../../context/UserAuthContext';
import logoutHandleSubmit from '../../utils/logOutOnClick';
import AuthApi from '../../api/AuthApi';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';


function SecondNavB() {
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

function SecondSide() {
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
      <div className="h-100 d-flex flex-md-column flex-grow-1 align-items-center align-items-md-start px-3 pt-0 text-white">
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

  

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation checks
    if (!newPassword || !confirmNewPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // TODO: Add logic here to update the password using an API call or any other method
    try {
        const email = localStorage.getItem('email');
        console.log(email);
        console.log(newPassword);
        ProfessorApi.changePassword(email,newPassword);
      } catch (err) {
        console.log(err);
      }

    // Assuming the password update was successful
    setSuccessMessage('Password updated successfully!');
    setNewPassword('');
    setConfirmNewPassword('');
    setErrorMessage('');
  };

  return (
          <div
            className="container-fluid g-0 d-flex flex-column "
            style={{ height: '100vh' }}
          >
          <div className="row mx-auto w-100 ">
            <div className="border-bottom d-flex flex-shrink align-items-center justify-content-center">
              <SecondNavB />
            </div>
          </div>
            <div className="row d-flex w-100 h-100 mx-0 flex-fill">
              <div className="d-flex col-12 col-md-2 fake-xxl h-sm-100px px-0 bg-info sticky-top">
                <SecondSide />
              </div>
              <div className="h-50 change-password-container">
                <h1>Change Password</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    </div>
                    <button type="submit">Change Password</button>
                </form>
                </div>
            </div>
          </div>
        );
      }
      
    


