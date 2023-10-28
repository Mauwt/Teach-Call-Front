import { NavigateFunction } from 'react-router-dom';
import AuthApi from '../api/AuthApi';
import { UserAuth } from '../context/UserAuthContext';

export default async function logoutHandleSubmit(
  setUser: (user: UserAuth | null) => void,
  navigate: NavigateFunction,
  to?: string
) {
  try {
    AuthApi.logout();
    setUser(null);
    return navigate(to || '/');
  } catch (error) {
    console.log(error);
    return navigate('/');
  }
}
