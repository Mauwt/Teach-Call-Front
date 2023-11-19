import { Outlet, Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  rol: string;
  redirectTo: string | null;
  children?: React.ReactNode | null; /* eslint-disable-line */
};

export default function ProtectedRoute({ ...props }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token) {
    return <Navigate to={props.redirectTo || '/'} />;
  }

  if (rol === props.rol && props.children) {
    return props.children;
  }

  return <Outlet />;
}
