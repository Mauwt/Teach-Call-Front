import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';

export type ProfessorEducation = {
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
  schoolName: string;
  imgUrl: string;
};

export type AddCategoriesReq = {
  email: string | null;
  categories: Array<number>;
};

const ProfessorApi = {
  addEducation: async (
    email: string | null,
    education: ProfessorEducation
  ): Promise<AxiosResponse<string>> => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const response = await api.post(
      `/professor/education/${email}`,
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

    const response = await api.post('/professor/categories', jsonData, {
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
      `/professor/description/${email}`,
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

    const response = await api.patch(`/professor/completed-tour/${email}`, '', {
      headers,
    });

    return response;
  },
};

export default ProfessorApi;
