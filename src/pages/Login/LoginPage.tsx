import { FC } from "react";
import { LoginForm, PageContainer } from "@components/index";

export const LoginPage: FC = () => {
  return (
    <PageContainer className='flex-col-center'>
      <LoginForm />
    </PageContainer>
  );
};
