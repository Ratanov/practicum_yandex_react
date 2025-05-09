import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  TSelectedIngredientsWithKey,
  useSelectedIngredients,
} from '@shared/contexts';
import { FC, useCallback } from 'react';
import classes from './ingredient.module.css';

type TIngredientsProps = {
  selectedIngredient: TSelectedIngredientsWithKey;
};

export const Ingredient: FC<TIngredientsProps> = ({ selectedIngredient }) => {
  const { setSelectedIngredients } = useSelectedIngredients();

  const handleClose = useCallback(
    (item: TSelectedIngredientsWithKey) =>
      setSelectedIngredients?.((prev) => {
        if (!prev || prev?.length === 1) {
          return null;
        }

        return prev.filter((prevItem) => prevItem.__key !== item.__key);
      }),
    [setSelectedIngredients]
  );

  return (
    <li className={classes.ingredient}>
      <DragIcon type='primary' />
      <ConstructorElement
        price={selectedIngredient.price}
        text={selectedIngredient.name}
        thumbnail={selectedIngredient.image}
        handleClose={() => handleClose(selectedIngredient)}
      />
    </li>
  );
};
