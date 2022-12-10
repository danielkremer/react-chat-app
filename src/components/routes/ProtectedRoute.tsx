import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../../store/hooks';

const ProtectedRoute = () => {
  const loggedInUser = useAppSelector(({ user }) => user.loggedInUser);

  if (!loggedInUser) {
    return <Navigate to={'/login'} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
