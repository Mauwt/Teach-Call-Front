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
  addLike: async (postId: string): Promise<AxiosResponse> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.post(
      `${API_PREFIX}/like/${postId}`,
      {},
      { headers }
    );
    return response;
  },
  createPost: async (title: string, body: string): Promise<AxiosResponse> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const data = {
      title,
      body,
    };

    const response = await api.post(`${API_PREFIX}`, data, { headers });
    return response;
  },
  deletePost: async (postId: string): Promise<AxiosResponse> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.delete(`${API_PREFIX}/${postId}`, { headers });
    return response;
  },
};

export default PostApi;
