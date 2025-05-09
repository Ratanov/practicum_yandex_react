import { TIngredient } from '@shared/api';
import { Dispatch, SetStateAction } from 'react';

export type TSelectedIngredientsWithKey = TIngredient & { __key: string };

export type TSelectedIngredientsContext = {
  selectedBun: TIngredient | null;
  selectedIngredients: Array<TSelectedIngredientsWithKey> | null;
  setSelectedIngredients: Dispatch<
    SetStateAction<Array<TSelectedIngredientsWithKey> | null>
  > | null;
  setSelectedBun: Dispatch<SetStateAction<TIngredient | null>> | null;
};
