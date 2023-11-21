import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';

const MeetingApi = {
  getMeetingHostRoom: async (
    bookingId: string
  ): Promise<AxiosResponse<any>> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const res = api.get(`/meetingDetails//teacher/${bookingId}`, { headers });
    return res;
  },
  getMeetingStudentRoom: async (
    bookingId: string
  ): Promise<AxiosResponse<any>> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const res = api.get(`/meetingDetails/student/${bookingId}`, { headers });
    return res;
  },
};

export default MeetingApi;
