import { AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { LoginReq, LoginRes } from '../types/Auth';
import validateLoginForm from './validateLoginForm';
import AuthApi from '../api/AuthApi';

const loginHandleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  user_role: string,
  navigate: NavigateFunction
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const data: LoginReq = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const errors: Map<string, string> = validateLoginForm(data);
  const errorDiv = document.querySelector('.login-error');
  errorDiv!.classList.add('d-none');

  if (!(errors.size === 0)) {
    errorDiv!.classList.remove('d-none');
    errorDiv!.innerHTML = 'Email o contraseña incorrectos';
    return;
  }

  const tokenResponse: Promise<AxiosResponse<LoginRes>> = AuthApi.login(
    data,
    user_role
  );

  tokenResponse
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      navigate(`/dashboard/${user_role}`);
    })
    .catch((error) => {
      if (error.response.status && error.response.status !== 500) {
        errorDiv!.classList.remove('d-none');
        errorDiv!.innerHTML = 'Email o contraseña incorrectos';
      } else {
        errorDiv!.classList.remove('d-none');
        errorDiv!.innerHTML = 'Error de conexión, intente más tarde';
      }
    });
};

export default loginHandleSubmit;