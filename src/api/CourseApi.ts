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

    const response = await api.get(`/course/professor/${id}?page=${page}`, { headers });
    return response;
  },
};

export default CourseApi;
