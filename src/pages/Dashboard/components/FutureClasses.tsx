import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingApi from '../../../api/Booking';
import { getExplicitStringDate } from '../../../utils/DateAndTimeUtils';
import userlogo from '../../../assets/descarga.png';

export type BookingDataProps = {
  id: number;
  startTime: string;
  date: string;
  title: string;
  firstName: string;
  lastName: string;
  link: string;
  userType?: string;
};

export function ClassCard(bookingData: BookingDataProps) {
  const bookingDate = getExplicitStringDate(bookingData.date);
  const bookingStartTime = bookingData.startTime.slice(0, 5);

  const navigate = useNavigate();

  const onClick = () => {
    navigate(
      `/meeting?bokingId=${bookingData.id}&startTime=${bookingData.startTime}&date=${bookingData.date}`
    );
  };

  return (
    <div
      className="booking-card d-flex  border rounded mb-3"
      style={{ height: 'max-content', width: '100%', backgroundColor: 'white' }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div
        className="d-none d-lg-flex teacher-img img ms-2 mt-2"
        style={{ height: '60px', borderColor: 'red' }}
      >
        <img
          src={userlogo}
          className="rounded-circle round"
          alt=""
          style={{ maxHeight: '40px', objectFit: 'contain' }}
        />
      </div>
      <div className="d-flex flex-column flex-fill">
        <div className="d-flex justify-content-between ms-2 mb-0">
          <div className="d-inline mt-1 mb-0 ms-2 ms-md-0 ">
            <p
              className="d-inline lh-1"
              style={{ fontSize: '15px', fontWeight: 900 }}
            >
              {bookingDate}
            </p>
            <p className=" my-0 lh-2 text-muted">
              <b className="d-none d-lg-inline" style={{ fontSize: '14px' }}>
                {bookingData.userType === 'student' ? 'Alumno' : 'Profesor'}
              </b>{' '}
              {bookingData.firstName} {bookingData.lastName}
            </p>
            <p className="mt-0 lh-1 text-muted">{bookingData.title}</p>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="d-inline mt-1 me-3 "> {bookingStartTime}</p>
            {/* eslint-disable-next-line */}
            <a
              role="button"
              onClick={onClick}
              className="d-flex align-items-center text-decoration-none text-dark me-2 mt-3"
              style={{ fontSize: '12px' }}
            >
              Ir a la reunión{' '}
              <span
                className="material-symbols-outlined d-inline"
                style={{ fontSize: '15px' }}
              >
                arrow_right_alt
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FutureClasses() {
  const [userBookings, setUserBookings] = useState([]);
  const [islastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await BookingApi.getStudentBookings(page);
        setUserBookings(response.data.content);
        setIsLastPage(response.data.last);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserBookings();
  }, [page]);
  return (
    <div
      className="bookings d-flex flex-column flex-grow-2 rounded overflow-auto pe-2 me-3"
      style={{ height: '450px', backgroundColor: '#F8F9FA' }}
    >
      {userBookings.map((booking: BookingDataProps) => (
        <ClassCard
          key={booking.title + booking.date + booking.startTime}
          id={booking.id}
          startTime={booking.startTime}
          date={booking.date}
          title={booking.title}
          firstName={booking.firstName}
          lastName={booking.lastName}
          link={booking.link}
        />
      ))}
      <div
        className={`${islastPage ? 'd-none' : 'd-flex'} justify-content-center`}
      >
        {!islastPage && (
          <button
            type="button"
            className="btn btn-primary mt-2 mb-3"
            onClick={() => setPage(page + 1)}
          >
            Ver más
          </button>
        )}
      </div>
    </div>
  );
}
