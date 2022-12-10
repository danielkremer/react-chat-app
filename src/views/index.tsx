import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import AppRoute from '../components/routes/AppRoute';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import PublicRoute from '../components/routes/PublicRoute';
import { PageContainer } from '../components/templates/PageContainer';
import appConfig from '../configs/app.config';
import { protectedRoutes, publicRoutes } from '../configs/routes.config';

const AllRoutes = () => {
  const { authenticatedEntryPath } = appConfig;
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute />}>
        <Route path='/' element={<Navigate replace to={authenticatedEntryPath} />} />
        {protectedRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              <PageContainer>
                <AppRoute routeKey={route.key} Component={route.component} />
              </PageContainer>
            }
          />
        ))}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
      <Route path='/' element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PageContainer>
                <AppRoute routeKey={route.key} Component={route.component} />
              </PageContainer>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

const Views = () => {
  return (
    <Suspense>
      <AllRoutes />
    </Suspense>
  );
};

export default Views;
