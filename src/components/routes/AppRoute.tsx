import { useCallback, useEffect } from 'react';
import { setCurrentRouteKey } from '../../store/base/commonSlice';
import { useAppDispatch } from '../../store/hooks';

interface IProps {
  routeKey: any;
  Component: React.LazyExoticComponent<() => JSX.Element>;
}

const AppRoute = ({ routeKey, Component }: IProps) => {
  const dispatch = useAppDispatch();

  const handleRouteChange = useCallback(() => {
    dispatch(setCurrentRouteKey(routeKey));
  }, [dispatch, routeKey]);

  useEffect(() => {
    handleRouteChange();
  }, [handleRouteChange]);

  return <Component />;
};

export default AppRoute;
