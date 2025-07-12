import { TBaseError } from "../baseError.type";

export type TMessageResponse =
  | {
      success: true;
      message: string;
    }
  | TBaseError;
