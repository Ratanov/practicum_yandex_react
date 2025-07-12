import { FC, useEffect } from 'react';
import { useAppDispatch } from '@shared/services/hooks';
import { wsOnConnecting, wsOnClose } from '@shared/services/reducers/userSlice';
import { PageContainer, UserOrdersList } from '@components/index';
import classes from './profileOrdersPage.module.css';

export const ProfileOrdersPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOnConnecting());

    return () => {
      dispatch(wsOnClose());
    };
  }, []);

  return (
    <PageContainer className={classes['profile-orders']}>
      <UserOrdersList />
    </PageContainer>
  );
};
