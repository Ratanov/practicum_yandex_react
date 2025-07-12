import { TBaseError } from "../baseError.type";

export type TApiResponse<T> =
  | {
      success: true;
      data: T;
      error?: string;
    }
  | TBaseError;
