import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';

const BookingApi = {
  addBooking: (
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
};

export default BookingApi;