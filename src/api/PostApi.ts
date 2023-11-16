import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';

const API_PREFIX = '/posts';

const PostApi = {
  getPostWithPagination: async (
    page: number,
    size: number
  ): Promise<AxiosResponse> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.get(
      `${API_PREFIX}/feed?page=${page}&size=${size}`,
      { headers }
    );
    return response;
  },
  getCurrentUserPostWithPagination: async (): Promise<AxiosResponse> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.get(`${API_PREFIX}/myposts`, { headers });
    return response;
  },
};

export default PostApi;
