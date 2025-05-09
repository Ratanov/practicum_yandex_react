import { FC } from 'react';
import { TSelectedIngredientsWithKey } from '@shared/contexts';
import { Ingredient } from '../ingredient';
import classNames from 'classnames';
import classes from './ingredients.module.css';

type TIngredientsProps = {
  selectedIngredients: Array<TSelectedIngredientsWithKey> | null;
};

export const Ingredients: FC<TIngredientsProps> = ({ selectedIngredients }) => {
  if (!selectedIngredients) {
    return (
      <div
        className={classNames(
          classes.ingredients,
          classes['ingredients_empty'],
          'text text_type_main-default'
        )}>
        Начинка или соус не выбраны
      </div>
    );
  }

  return (
    <ul className={classes.ingredients}>
      {selectedIngredients.map((item) => (
        <Ingredient selectedIngredient={item} key={item.__key} />
      ))}
    </ul>
  );
};
