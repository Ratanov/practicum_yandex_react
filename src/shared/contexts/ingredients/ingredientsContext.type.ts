import { Dispatch, SetStateAction } from 'react';
import { TIngredient } from '@shared/api';

export type TIngredientContext = {
  isLoading: boolean;
  ingredients?: Array<TIngredient>;
  setIngredients?: Dispatch<SetStateAction<TIngredient[]>>;
};
