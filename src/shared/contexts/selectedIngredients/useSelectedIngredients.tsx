import { useContext } from 'react';
import { SelectedIngredients } from './selectedIngredientsContext';

export const useSelectedIngredients = () => {
  const selectedIngredients = useContext(SelectedIngredients);
  return selectedIngredients;
};
