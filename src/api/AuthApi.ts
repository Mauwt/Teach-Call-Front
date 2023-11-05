import { AxiosResponse } from 'axios';
import api from './configs/axiosConfig';
import { LoginReq, LoginRes, RegisterReq, RegisterRes } from './types/Auth';

const AuthApi = {
  login: async (
    data: LoginReq,
    user_role: string
  ): Promise<AxiosResponse<LoginRes>> => {
    const response = await api.post(`/auth/signin`, {
      email: data.email,
      password: data.password,
      role: user_role,
    });
    return response;
  },
  register: async (
    data: RegisterReq,
    user_role: string
  ): Promise<AxiosResponse<RegisterRes>> => {
    const response = await api.post(`/auth/signup`, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: user_role,
    });
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
