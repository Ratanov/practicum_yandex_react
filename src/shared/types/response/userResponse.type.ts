import { TUserData } from '../userData.type';

export type TUserResponse = {
  success: boolean;
  user: Omit<TUserData, 'password'>;
};
