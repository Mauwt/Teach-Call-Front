import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';
import { LoginReq, LoginRes, RegisterReq, RegisterRes } from '../types/Auth';

const AuthApi = {
  login: async (data: LoginReq): Promise<AxiosResponse<LoginRes>> => {
    const response = await api.post('/auth/login', { data });
    return response;
  },
  register: async (data: RegisterReq): Promise<AxiosResponse<RegisterRes>> => {
    const response = await api.post('/auth/register', { data });
    return response;
  },
  logout: (): void => {
    localStorage.removeItem('token');
  },
  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  },
};

export default AuthApi;
