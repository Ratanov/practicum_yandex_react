import { FC } from "react";
import { PageContainer, ProfileForm } from "@components/index";

export const ProfilePage: FC = () => {
  return (
    <PageContainer className='flex-col-start'>
      <ProfileForm />
    </PageContainer>
  );
};
