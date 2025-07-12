import { FC, useEffect } from 'react';
import { PageContainer, OrderByIdDetails } from '@components/index';
import { useAppDispatch } from '@shared/services/hooks';
import { wsOnConnecting, wsOnClose } from '@shared/services/reducers/userSlice';

export const ProfileOrderById: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOnConnecting());

    return () => {
      dispatch(wsOnClose());
    };
  }, []);

  return (
    <PageContainer className='flex-col-start'>
      <OrderByIdDetails type='profile' />
    </PageContainer>
  );
};
