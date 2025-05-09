import { useContext } from 'react';
import { Ingredients } from './ingredientsContext';

export const useIngredients = () => {
  const ingredients = useContext(Ingredients);
  return ingredients;
};
