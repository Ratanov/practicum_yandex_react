import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@shared/services/hooks';
import { PageContainer, ResetPasswordForm } from '@components/index';

import { FC } from 'react';

export const ResetPasswordPage: FC = () => {
  const passwordState = useAppSelector((state) => state.password);

  if (
    !passwordState.isMailSend ||
    history.state.usr?.from !== '/forgot-password'
  ) {
    return <Navigate to='/forgot-password' />;
  }

  if (passwordState.successReset) {
    return <Navigate to='/login' />;
  }

  return (
    <PageContainer className='flex-col-center'>
      <ResetPasswordForm />
    </PageContainer>
  );
};
