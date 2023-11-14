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
};

export default AvailabilityApi;
