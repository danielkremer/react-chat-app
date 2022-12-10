import { Navigate, Outlet } from 'react-router-dom';
import appConfig from '../../configs/app.config';
import { useAppSelector } from '../../store/hooks';

const { authenticatedEntryPath } = appConfig;

const PublicRoute = () => {
  const loggedInUser = useAppSelector(({ user }) => user.loggedInUser);

  return loggedInUser ? <Navigate to={authenticatedEntryPath} /> : <Outlet />;
};

export default PublicRoute;
