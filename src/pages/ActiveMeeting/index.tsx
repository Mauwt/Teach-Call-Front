import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MeetingApi from '../../api/MeetingApi';

export default function ActiveMeeting() {
  const [isActive, setIsActive] = useState(false);
  const [link, setLink] = useState('');

  const navigate = useNavigate();

  const [params] = useSearchParams();

  // arrow function use effect
  useEffect(() => {
    const apicall = async () => {
      const bookingId = params.get('bokingId');
      const startTime = params.get('startTime');
      const date = params.get('date');
      console.log(bookingId);
      console.log(startTime);
      console.log(date);

      const currentDate = new Date();
      const bookingDate = new Date(`${params.get('date')}T${startTime}`);
      bookingDate.setHours(parseInt(startTime.split(':')[0], 10));

      console.log(currentDate.toLocaleDateString('es-ES'));
      console.log(bookingDate.toLocaleDateString('es-ES'));

      const compareDates = currentDate.getTime() - bookingDate.getTime();
      console.log(currentDate.getTime().toLocaleString('es-ES'));
      console.log(bookingDate.getTime().toLocaleString('es-ES'));

      // One hour to miliseconds
      const oneHour = 60 * 60 * 1000;

      if (compareDates > 0 && compareDates < oneHour) {
        setIsActive(true);
        // get role
        const role = localStorage.getItem('role');
        if (role === 'teacher') {
          const response = await MeetingApi.getMeetingHostRoom(bookingId);
          console.log(response.data);
          setLink(response.data);
        } else if (role === 'student') {
          const response = await MeetingApi.getMeetingStudentRoom(bookingId);
          console.log(response.data);
          setLink(response.data);
        }
      } else {
        setIsActive(false);
      }
    };
    apicall();
  }, [params]);

  return (
    <div>
      {isActive ? (
        <iframe
          title="meeting"
          src={link}
          allow="camera; microphone; fullscreen; speaker; display-capture; compute-pressure"
          style={{ height: '700px', width: '100%' }}
        />
      ) : (
        <div
          className="w-100 d-flex flex-column justify-content-center align-items-center bg-secondary"
          style={{ height: '100vh' }}
        >
          <div className="container w-50 border shadow-lg bg-light">
            <div className="row d-flex w-75 mx-auto py-5">
              <div className="col-3 d-flex flex-column align-items-center ">
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
                <div className="d-flex justify-content-around align-items-center">
                  <span
                    className="material-symbols-outlined text-danger"
                    style={{ fontSize: 48 }}
                  >
                    person_raised_hand
                  </span>
                  <span
                    className="material-symbols-outlined text-danger ps-0"
                    style={{ fontSize: 48 }}
                  >
                    question_mark
                  </span>
                </div>
              </div>
              <div className="col-8 d-flex flex-column justify-content-center align-items-center">
                <div className="h5">
                  Esta llamada no se encuentra disponible{' '}
                </div>
                <div className="h6">Revisa el horario o vuelve a intentar</div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-info my-3 mx-auto d-block w-25 "
              onClick={() =>
                navigate(`/dashboard/${localStorage.getItem('role')}`)
              }
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
