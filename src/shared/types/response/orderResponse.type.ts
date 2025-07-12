import { TBaseError } from "../baseError.type";

export type TOrderResponse =
  | {
      name?: string;
      order?: {
        number: number;
      };
      success: true;
    }
  | TBaseError;
