import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';
import {
  WeekAvailabilityRes,
  TimeRange,
  WeekAndDayAvailabilityResponse,
} from './types/ProfessorAvailability';

const AvailabilityApi = {
  getWeekAvailibility: async (
    email: string,
    weekNumber: number
  ): Promise<AxiosResponse<WeekAvailabilityRes>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.get(
      `/availability/weekly/${email}?week=${weekNumber}`,
      { headers }
    );

    return response;
  },
  getWeekAvailibilityById: async (
    id: number,
    weekNumber: number
  ): Promise<AxiosResponse> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.get(`/availability/${id}?week=${weekNumber}`, {
      headers,
    });

    return response;
  },
  setWeekAvailability: async (
    email: string,
    weekNumber: number,
    timeRanges: Record<number, TimeRange>
  ): Promise<AxiosResponse<WeekAvailabilityRes>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const data = {
      professorEmail: email,
      weekNumber,
      timeRanges,
    };

    const response = await api.post(`/availability/weekly`, data, { headers });

    return response;
  },
  getWeekAndDayAvailability: async (
    email: string,
    weekNumber: number,
    dayNumber: number
  ): Promise<AxiosResponse<WeekAndDayAvailabilityResponse>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.get(
      `/availability/day/${email}/${weekNumber}/${dayNumber}`,
      { headers }
    );
    return response;
  },
  getfreeTimeSlots: async (
    teacherId: number,
    wekkNumber: number,
    dayNumber: number
  ) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.get(
      `/availability/free/${teacherId}?week=${wekkNumber}&day=${dayNumber}`,
      { headers }
    );
    return response;
  },
  getBookingByTimeSlotID: async (timeSlotId: number) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.get(`availability/booking/${timeSlotId}`, {
      headers,
    });
    return response;
  },
};

export default AvailabilityApi;
