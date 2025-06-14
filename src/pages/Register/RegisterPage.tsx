import { FC } from 'react';
import { PageContainer, RegisterForm } from '@components/index';

export const RegisterPage: FC = () => {
  return (
    <PageContainer className='flex-col-center'>
      <RegisterForm />
    </PageContainer>
  );
};
