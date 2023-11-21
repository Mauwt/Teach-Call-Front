import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MeetingApi from '../../api/MeetingApi';

export default function ActiveMeeting() {
  const [isActive, setIsActive] = useState(false);
  const [link, setLink] = useState('');

  const [params] = useSearchParams();

  // arrow function use effect
  useEffect(() => {
    const apicall = async () => {
      const bookingId = params.get('bokingId');
      const startTime = params.get('startTime');
      const date = params.get('date');

      const currentDate = new Date();
      const bookingDate = new Date(params.get('date'));
      bookingDate.setHours(parseInt(startTime.split(':')[0], 10));

      const compareDates = currentDate.getTime() - bookingDate.getTime();

      if (compareDates > 0) {
        setIsActive(false);
      } else {
        setIsActive(true);
        // get role
        const role = localStorage.getItem('role');
        if (role === 'teacher') {
          const response = await MeetingApi.getMeetingHostRoom(bookingId);
          setLink(response.data);
        } else if (role === 'student') {
          const response = await MeetingApi.getMeetingStudentRoom(bookingId);
          console.log(response.data);
          setLink(response.data);
        }
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
        <h1>Vuelve mas tarde</h1>
      )}
    </div>
  );
}
