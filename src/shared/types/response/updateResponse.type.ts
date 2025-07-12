import { TBaseError } from '../baseError.type';
import { TTokens } from '../tokens.type';

export type TUpdateResponse =
  | ({
      success: true;
    } & TTokens)
  | TBaseError;
