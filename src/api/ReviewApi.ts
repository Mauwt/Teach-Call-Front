import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';

const API_PREFIX = '/review';

const ReviewApi = {
  getReviewsByProfessorEmail: async (
    email: string,
    page: number,
    size: number
  ): Promise<AxiosResponse> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get(
      `review/all/${email}?page=${page}&size=${size}`,
      { headers }
    );
    return response;
  },
  getReviews: async (productId: number): Promise<AxiosResponse> => {
    return api.get(`${API_PREFIX}/${productId}`);
  },
  postReview: async (
    productId: number,
    review: any
  ): Promise<AxiosResponse> => {
    return api.post(`${API_PREFIX}/${productId}`, review);
  },
};

export default ReviewApi;
