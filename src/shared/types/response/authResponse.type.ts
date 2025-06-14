import { TTokens } from '../tokens.type';
import { TUserData } from '../userData.type';

export type TAuthResponse = {
  success: boolean;
  user: Omit<TUserData, 'password'>;
} & TTokens;
