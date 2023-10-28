import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserAuthContext } from '../context/UserAuthContext';

type ProtectedRouteProps = {
  rol: string;
  redirectTo: string | null;
  children?: React.ReactNode | null; /* eslint-disable-line */
};

export default function ProtectedRoute({ ...props }: ProtectedRouteProps) {
  const { user } = useContext(UserAuthContext);

  if (!user) {
    return <Navigate to={props.redirectTo || '/'} />;
  }

  if (user.rol === props.rol && props.children) {
    return props.children;
  }

  return <Outlet />;
}
