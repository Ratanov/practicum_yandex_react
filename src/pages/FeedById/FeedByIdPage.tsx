import { FC, useEffect } from 'react';
import { useAppDispatch } from '@shared/services/hooks';
import { OrderByIdDetails } from '@components/OrderByIdDetails/OrderByIdDetails';
import { wsOnConnecting, wsOnClose } from '@shared/services/reducers/feedSlice';
import { PageContainer } from '@components/index';

export const FeedByIdPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOnConnecting());

    return () => {
      dispatch(wsOnClose());
    };
  }, []);

  return (
    <PageContainer className='flex-col-center'>
      <OrderByIdDetails type='feed' />
    </PageContainer>
  );
};
