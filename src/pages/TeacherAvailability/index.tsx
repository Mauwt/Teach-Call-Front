import './styles.css';

import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

export default function TeacherAvailability() {
  const location = useLocation();

  const { teacherId } = location.state;
  return <div className="h1">Hola{teacherId}</div>;
}
