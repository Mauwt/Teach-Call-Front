import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';

const BookingApi = {
  addBooking: async (
    courseId: number,
    professorId: number,
    timeSlotId: string
  ): Promise<AxiosResponse<any>> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    return api.post(
      '/bookings/new',
      {
        courseId,
        professorId,
        timeSlotId,
      },
      { headers }
    );
  },
  getStudentBookings: async (page: number) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    return api.get(`/bookings/student?page=${page}`, { headers });
  },
};

export default BookingApi;
