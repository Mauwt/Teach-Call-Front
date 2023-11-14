import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';
import { ProfessorEducation, AddCategoriesReq } from './types/Professor';

const API_PREFIX = '/professor';

const ProfessorApi = {
  addEducation: async (
    email: string | null,
    education: ProfessorEducation
  ): Promise<AxiosResponse<string>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.post(
      `${API_PREFIX}/education/${email}`,
      education,
      {
        headers,
      }
    );
    return response;
  },
  addCategories: async (data: AddCategoriesReq): Promise<AxiosResponse> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const jsonData = JSON.stringify(data);

    const response = await api.post(`${API_PREFIX}/categories`, jsonData, {
      headers,
    });

    return response;
  },
  addDescription: async (
    email: string,
    description: string
  ): Promise<AxiosResponse> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.patch(
      `${API_PREFIX}/description/${email}`,
      description,
      { headers }
    );

    return response;
  },
  setCompletedTour: async (email: string): Promise<AxiosResponse> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.patch(
      `${API_PREFIX}/completed-tour/${email}`,
      '',
      {
        headers,
      }
    );

    return response;
  },
  getAllWithPagination: async (
    page: number = 1
  ): Promise<AxiosResponse<any>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get(`${API_PREFIX}?page=${page}`, { headers });
    return response;
  },
  getAllByCategoryWithPagination: async (
    category: string,
    page: number = 1
  ): Promise<AxiosResponse<any>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get(
      `${API_PREFIX}/category?page=${page}&category=${category}`,
      { headers }
    );
    return response;
  },
  getDescriptionByEmail: async (email: string): Promise<AxiosResponse<any>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get(`${API_PREFIX}/description/${email}`, {
      headers,
    });
    return response;
  },
  getLastEducationAndExperienceByEmail: async (
    email: string
  ): Promise<AxiosResponse<any>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get(`${API_PREFIX}/experience/last/${email}`, {
      headers,
    });
    return response;
  },
  getAllEduacationWithPaginationByEmail: async (
    email: string,
    page: number = 1
  ): Promise<AxiosResponse<any>> => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await api.get(
      `${API_PREFIX}/education/${email}?page=${page}`,
      { headers }
    );
    return response;
  },
};

export default ProfessorApi;
