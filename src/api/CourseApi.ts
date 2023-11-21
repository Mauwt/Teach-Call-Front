import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';
import { TopCourseRes } from './types/Course';

const CourseApi = {
  getTopFiveCourses: async (): Promise<AxiosResponse<Array<TopCourseRes>>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get(`/course/top`, { headers });
    return response;
  },
  getAllByTeacherId: async (
    id: number,
    page: number
  ): Promise<AxiosResponse<any>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get(`/course/professor/${id}?page=${page}`, {
      headers,
    });
    return response;
  },

  getAllByTeacherEmail: async (
  ): Promise<AxiosResponse<any>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const email = localStorage.getItem('email');
    const response = await api.get(`/course/professord/${email}`, {
      headers,
    });
    return response;
  },
  getCourseFullInfo: async (id: number): Promise<AxiosResponse> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get(`/course/${id}/fullinfo`, { headers });
    if (response.status === 200) {
      console.log(response.data);
    } else {
      console.log('error');
    }
    return response;
  },
};

export default CourseApi;
