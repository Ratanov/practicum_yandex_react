import { FC, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { ConstructorTotal, Bun, Ingredients } from './widgets';
import classes from './burgerConstructor.module.css';
import { useAppDispatch } from '@shared/services/hooks';
import {
  setBun,
  addIngredient,
} from '@shared/services/reducers/selectedIngredientsSlice';
import { TIngredient } from '@shared/types';

interface DropItem {
  ingredient: TIngredient;
}

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  const handleIngredientDrop = useCallback(
    (ingredient: TIngredient) => {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
        return;
      }
      dispatch(addIngredient(ingredient));
    },
    [dispatch]
  );

  const [_, drop] = useDrop(
    () => ({
      accept: 'ingredient',
      drop: (item: DropItem, monitor) => {
        if (monitor.didDrop()) return;
        handleIngredientDrop(item.ingredient);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleIngredientDrop]
  );

  return (
    <section className={classes['constructor']}>
      <article ref={drop} className={classes['constructor__content']}>
        <Bun orientation='top' />
        <Ingredients />
        <Bun orientation='bottom' />
      </article>
      <ConstructorTotal />
    </section>
  );
};
