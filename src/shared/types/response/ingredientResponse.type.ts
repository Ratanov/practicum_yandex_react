import { TIngredient } from '../ingredient.type';
import { TBaseError } from '../baseError.type';

export type TIngredientResponse =
  | {
      success: true;
      data: Array<TIngredient>;
    }
  | TBaseError;
