import { useState, useEffect } from 'react';
import { ClassCard } from '../../Dashboard/components/FutureClasses';
import BookingApi from '../../../api/Booking';

type StudentData = {
  id: number;
  firstName: string;
  lastName: string;
};

type TimeSlotData = {
  id: number;
  startTime: string;
  date: string;
};

type CourseData = {
  id: number;
  title: string;
  description: string;
};

type BookingData = {
  id: number;
  link: string;
  student: StudentData;
  timeSlot: TimeSlotData;
  course: CourseData;
};

export default function FutureBookings() {
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [futureBookings, setFutureBookings] = useState<Array<BookingData>>([]);

  useEffect(() => {
    const fetchFutureBookings = async () => {
      try {
        const response = await BookingApi.getFutureBookings(page);
        setFutureBookings(response.data.content);
        setIsLastPage(response.data.last);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFutureBookings();
  }, [page]);

  return (
    <div
      className="bookings d-flex flex-column flex-grow-2 rounded overflow-auto pe-2 me-3 border-bottom"
      style={{ height: '450px', backgroundColor: '#F8F9FA' }}
    >
      {futureBookings &&
        futureBookings.map((booking: BookingData) => (
          <ClassCard
            key={booking.id}
            id={booking.id}
            startTime={booking.timeSlot.startTime}
            date={booking.timeSlot.date}
            title={booking.course.title}
            firstName={booking.student.firstName}
            lastName={booking.student.lastName}
            link={booking.link}
            userType="student"
          />
        ))}
      {futureBookings.length === 0 && (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <h5 className="text-center">No hay clases agendadas</h5>
        </div>
      )}
      <div
        className={`${isLastPage ? 'd-none' : 'd-flex'} justify-content-center`}
      >
        {!isLastPage && futureBookings.length > 0 && (
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
