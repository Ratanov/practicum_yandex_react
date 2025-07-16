import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/services/hooks';
import { setOrderItems } from '@shared/services/reducers/orderSlice';
import { Ingredient } from '../Ingredient';
import classNames from 'classnames';
import classes from './ingredients.module.css';

export const Ingredients: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedIngredients, selectedBun } = useAppSelector(
    (state) => state.selectedIngredients
  );

  const orderItems = useMemo(() => {
    if (!selectedIngredients && !selectedBun) return [];

    const ingredientsIds = selectedIngredients?.map((item) => item._id) || [];
    return selectedBun
      ? [selectedBun._id, ...ingredientsIds, selectedBun._id]
      : ingredientsIds;
  }, [selectedIngredients, selectedBun]);

  useEffect(() => {
    if (orderItems.length > 0) {
      dispatch(setOrderItems(orderItems));
    }
  }, [orderItems, dispatch]);

  if (!selectedIngredients?.length) {
    return (
      <div
        className={classNames(
          classes.ingredients,
          classes['ingredients_empty'],
          'text text_type_main-default'
        )}
        data-cy='order-inner-ingredients'>
        Начинка или соус не выбраны
      </div>
    );
  }

  return (
    <ul className={classes.ingredients} data-cy='order-inner-ingredients'>
      {selectedIngredients.map((item, index) => (
        <Ingredient
          key={item.__key}
          selectedIngredient={item}
          currentIndex={index}
        />
      ))}
    </ul>
  );
};
