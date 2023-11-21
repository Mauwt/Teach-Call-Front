import { useState } from 'react';
import React, { ComponentType } from 'react';
import './style.css';
import ProfessorApi from '../../api/ProfessorApi';


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
    <div className="change-password-container">
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
  );
}

