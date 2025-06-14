import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../services/hooks';

export const useUserRedirect = () => {
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    const { isAuth } = userState;
    if (isAuth) {
      navigate(history.state.usr?.from || '/');
    }
  }, [userState]);
};
