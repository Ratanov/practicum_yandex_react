import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { TIngredient } from '@shared/api';
import classes from './ingredientCard.module.css';

interface IngredientCardProps {
  ingredient: TIngredient;
}

export const IngredientCard: FC<IngredientCardProps> = ({ ingredient }) => {
  const { image, name, price } = ingredient;

  return (
    <div className={classes['card']}>
      <img
        src={image}
        alt={`${name} изображение`}
        className={classes['card__image']}
      />
      <span
        className={classNames(
          'text text_type_main-default',
          classes['card__price']
        )}>
        {price}
        <CurrencyIcon type='primary' />
      </span>
      <p
        className={classNames(
          'text text_type_main-default',
          classes['card__title']
        )}>
        {name}
      </p>
    </div>
  );
};
