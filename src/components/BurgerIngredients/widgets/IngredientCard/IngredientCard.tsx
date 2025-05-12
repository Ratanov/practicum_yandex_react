import { FC, useCallback, useMemo, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '@shared/services/hooks';
import { setIngredient } from '@shared/services/reducers/selectedIngredientsSlice';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '@shared/api';
import { IngredientsDetails, Modal } from '@components/index';
import classNames from 'classnames';
import classes from './ingredientCard.module.css';

interface IIngredientCardProps {
  ingredient: TIngredient;
}

export const IngredientCard: FC<IIngredientCardProps> = ({ ingredient }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { selectedBun, selectedIngredients } = useAppSelector(
    (state) => state.selectedIngredients
  );

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleModalOpen = useCallback(
    (item: TIngredient) => {
      dispatch(setIngredient(item));
      setIsModalOpen(true);
    },
    [dispatch]
  );

  const handleModalClose = useCallback(() => {
    dispatch(setIngredient(null));
    setIsModalOpen(false);
  }, [dispatch]);

  const ingredientCount = useMemo(() => {
    if (selectedBun && selectedBun._id === ingredient._id) {
      return 1;
    }

    if (selectedIngredients) {
      return selectedIngredients.filter((item) => item._id === ingredient._id)
        .length;
    }

    return 0;
  }, [selectedBun, selectedIngredients, ingredient]);

  return (
    <>
      <div
        ref={dragRef}
        className={classNames(classes.card, isDragging && classes.card_drag)}
        onClick={() => handleModalOpen(ingredient)}>
        {!!ingredientCount && (
          <Counter count={ingredientCount} size='default' />
        )}
        <img
          src={ingredient.image}
          alt={`${ingredient.name} изображение`}
          className={classes.card__image}
        />
        <span
          className={classNames(
            classes.card__price,
            'text text_type_main-default'
          )}>
          {ingredient.price}
          <CurrencyIcon type='primary' />
        </span>
        <p
          className={classNames(
            classes.card__title,
            'text text_type_main-default'
          )}>
          {ingredient.name}
        </p>
      </div>
      {isModalOpen && (
        <Modal onClose={handleModalClose} title='Детали ингредиента'>
          <IngredientsDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};
