import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';

export type Category = {
  id: number;
  title: string;
  selected?: boolean;
};

const CategoryApi = {
  getAllCategories: async (): Promise<AxiosResponse<Array<Category>>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get('/category', { headers });

    response.data.forEach((category: Category) => {
      category.selected = false;
    });

    return response;
  },
};

export default CategoryApi;
