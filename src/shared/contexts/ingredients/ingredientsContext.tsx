import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { TIngredient } from '@shared/api';
import { ingredientsApi } from '@shared/api';
import type { TIngredientContext } from './ingredientsContext.type';

export const Ingredients = createContext<TIngredientContext>({
  isLoading: false,
});

export const IngredientsDataProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [ingredients, setIngredients] = useState<Array<TIngredient>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await ingredientsApi.getAll();

      if (data.success) {
        setIngredients(data.data);
      }
    } catch (error) {
      console.error('Failed to load ingredients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Ingredients.Provider value={{ isLoading, ingredients, setIngredients }}>
      {children}
    </Ingredients.Provider>
  );
};
