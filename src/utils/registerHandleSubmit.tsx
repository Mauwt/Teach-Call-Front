import { NavigateFunction } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { LoginRes, RegisterReq } from '../types/Auth';
import validateRegisterForm from './validateRegisterForm';
import AuthApi from '../api/AuthApi';

const registerHandleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  user_role: string,
  navigate: NavigateFunction
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const data: RegisterReq = {
    firstName: formData.get('user_name') as string,
    lastName: formData.get('user_last_name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    role: user_role,
  };

  console.log(data);

  const errorMessages = document.querySelectorAll('.error');
  errorMessages.forEach((message) => {
    message.classList.add('d-none');
  });

  const errors: Map<string, string> = validateRegisterForm(data);
  if (!(errors.size === 0)) {
    errors.forEach((value, key) => {
      const error = document.querySelector(`.${key}-error`);
      error!.classList.remove('d-none');
      error!.innerHTML = value;
    });
  }

  const tokenResponse: Promise<AxiosResponse<LoginRes>> = AuthApi.login(data);

  tokenResponse
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      navigate(`/dashboard/${user_role}`);
    })
    .catch(() => {
      console.log(`/dashboard/${user_role}`);
      navigate('/');
      //   if (error.response.status && error.response.status === 500) {
      //     errorDiv!.classList.remove('d-none');
      //     errorDiv!.innerHTML = 'Error de conexión, intente más tarde';
      //   }
    });
};

export default registerHandleSubmit;
