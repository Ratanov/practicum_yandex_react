import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@shared/services/hooks';
import { Spinner } from '@components/Spinner';

export const ProtectedRouteElement: FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const { isAuth, initLoading } = useAppSelector((state) => state.user);
  const location = useLocation();
  const from = location.state?.from || location.pathname || '/';

  if (initLoading) {
    return <Spinner description='Загрузка профиля пользователя...' />; // Здесь можете использовать ваш компонент прелоадера
  }

  if (!isAuth) {
    return <Navigate to='/login' state={{ from }} />;
  }

  return element;
};
