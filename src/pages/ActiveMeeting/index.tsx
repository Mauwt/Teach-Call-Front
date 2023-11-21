import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api/configs/axiosConfig';

export default function ActiveMeeting() {
  const [isActive, setIsActive] = useState(false);
  const [link, setLink] = useState('');

  const [params] = useSearchParams();

  // arrow function use effect
  useEffect(() => {
    console.log(params.get('bookingId'));
    console.log(params.get('startTime'));
    console.log(params.get('date'));

    /* const apicall = async () => {
      // extract current date
      const currentDate = new Date();

      // extract booking date
      const bookingDate = new Date(bookingData.date);

      // compare dates
      const compareDates = currentDate.getTime() - bookingDate.getTime();

      // if the difference is more than  0 minutes - not active
      if (compareDates > 0) {
        setIsActive(false);
      } else {
        setIsActive(true);
        // get role
        const role = localStorage.getItem('role');
        if (role === 'teacher') {
          const response = await api.get(
            `meetingDetails/teacher/${bookingData.id}`
          );
          setLink(response.data);
        } else if (role === 'student') {
          const response = await api.get(
            `meetingDetails/student/${bookingData.id}`
          );

          setLink(response.data);
        }
      }
    };
    apicall(); */
  }, []);

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
        <h1>Vuelve mas tarde</h1>
      )}
    </div>
  );
}
