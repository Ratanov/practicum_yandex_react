import { TBaseError } from '../baseError.type';
import { TTokens } from '../tokens.type';
import { TUserData } from '../userData.type';

export type TAuthResponse = {
  success: true;
  user: Omit<TUserData, 'password'>;
} & TTokens;
