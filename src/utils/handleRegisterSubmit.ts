import { AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { LoginRes, RegisterReq, RegisterRes } from '../api/types/Auth';
import validateRegisterForm from './validateRegisterForm';
import AuthApi from '../api/AuthApi';
import { UserAuth } from '../context/UserAuthContext';

const registerHandleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  user_role: string,
  navigate: NavigateFunction,
  setUser: (currentUser: UserAuth | null) => void,
  setFormError: (formError: string | null) => void
) => {
  const formData = new FormData(e.currentTarget);

  const data: RegisterReq = {
    firstName: formData.get('user_name') as string,
    lastName: formData.get('user_last_name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    role: user_role,
  };

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
    return;
  }

  const tokenResponse: Promise<AxiosResponse<RegisterRes>> = AuthApi.register(
    data,
    user_role
  );

  tokenResponse
    .then((response) => {
      localStorage.removeItem('token');
      localStorage.setItem('token', response.data.token);
      localStorage.removeItem('email');
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('firstName', response.data.user.firstName);
      localStorage.setItem('role', user_role);
      setUser({
        email: response.data.user.email,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        rol: user_role,
        tourCompleted: response.data.user.tourCompleted,
        token: response.data.token,
      });
      if (user_role === 'teacher') return navigate('/professor-tour');
      return navigate(`/dashboard/${user_role}`);
    })
    .catch((error) => {
      if (error.response.status === 409) {
        setFormError('Ya existe un usuario con ese correo');
      } else {
        setFormError('Error al crear el usuario');
      }
    });
};

export default registerHandleSubmit;
