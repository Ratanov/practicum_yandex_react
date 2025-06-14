import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@shared/services/hooks';

export const ProtectedRouteElement: FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const userData = useAppSelector((state) => state.user);
  const location = useLocation();
  const from = location.state?.from || location.pathname || '/';

  if (!userData.isAuth) {
    return <Navigate to='/login' state={{ from }} />;
  }

  return element;
};
