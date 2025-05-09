import { createContext, FC, PropsWithChildren, useState } from 'react';
import { TSelectedIngredientsContext } from './selectedIngredientsContext.type';

export const SelectedIngredients = createContext<TSelectedIngredientsContext>({
  selectedBun: null,
  selectedIngredients: null,
  setSelectedBun: null,
  setSelectedIngredients: null,
});

export const SelectedIngredientsProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedBun, setSelectedBun] =
    useState<TSelectedIngredientsContext['selectedBun']>(null);
  const [selectedIngredients, setSelectedIngredients] =
    useState<TSelectedIngredientsContext['selectedIngredients']>(null);

  return (
    <SelectedIngredients.Provider
      value={{
        selectedBun,
        selectedIngredients,
        setSelectedBun,
        setSelectedIngredients,
      }}>
      {children}
    </SelectedIngredients.Provider>
  );
};
