import { TBaseError } from '../baseError.type';
import { TUserData } from '../userData.type';

export type TUserResponse =
  | {
      success: true;
      user: Omit<TUserData, 'password'>;
    }
  | TBaseError;
