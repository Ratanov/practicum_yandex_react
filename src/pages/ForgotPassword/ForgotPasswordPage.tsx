import { FC } from 'react';
import { ForgotPasswordForm } from '@components/index';
import { PageContainer } from '@components/index';

export const ForgotPasswordPage: FC = () => {
  return (
    <PageContainer className='flex-col-center'>
      <ForgotPasswordForm />
    </PageContainer>
  );
};
