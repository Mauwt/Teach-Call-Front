import { AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { LoginReq, LoginRes } from '../api/types/Auth';
import validateLoginForm from './validateLoginForm';
import AuthApi from '../api/AuthApi';
import { UserAuth } from '../context/UserAuthContext';

const loginHandleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  user_role: string,
  navigate: NavigateFunction,
  setUser: (currentUser: UserAuth | null) => void
) => {
  const formData = new FormData(e.currentTarget);

  const data: LoginReq = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    role: user_role,
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
      localStorage.removeItem('token');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('firstName', response.data.user.firstName);
      localStorage.setItem('role', user_role);
      localStorage.setItem('pp', response.data.pp);
      localStorage.setItem('cover', response.data.cp);

      setUser({
        email: response.data.user.email,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        rol: user_role,
        tourCompleted:
          user_role === 'teacher' ? response.data.user.tourCompleted : null,
        token: response.data.token,
      });
      if (user_role === 'teacher' && !response.data.user.tourCompleted)
        return navigate('/professor-tour');

      return navigate(`/dashboard/${user_role}`);
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
