import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useAppSelector } from '@shared/services/hooks';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '@shared/types';
import classNames from 'classnames';
import classes from './ingredientCard.module.css';

interface IIngredientCardProps {
  ingredient: TIngredient;
}

export const IngredientCard: FC<IIngredientCardProps> = ({ ingredient }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleClick = () => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

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
    <div
      ref={dragRef}
      className={classNames(classes.card, isDragging && classes.card_drag)}
      onClick={handleClick}>
      {!!ingredientCount && <Counter count={ingredientCount} size='default' />}
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
  );
};
