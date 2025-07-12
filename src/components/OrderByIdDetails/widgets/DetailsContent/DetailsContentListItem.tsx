import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '@shared/types';
import classes from './detailsContent.module.css';
import classNames from 'classnames';

export const DetailsContentListItem: FC<{
  count: number;
  ingredient: TIngredient;
}> = ({ count, ingredient }) => {
  return (
    <li className={classes.order__item}>
      <figure
        className={classes['order__image-wrapper']}
        title={ingredient.name}>
        <img src={ingredient.image} alt={ingredient.name} />
      </figure>
      <span
        className={classNames(
          classes.order__name,
          'text text_type_main-default'
        )}>
        {ingredient.name}
      </span>
      <div className={classes.order__price}>
        <span className='text text_type_digits-default'>
          {count} x {ingredient.price}
        </span>
        <CurrencyIcon type='primary' />
      </div>
    </li>
  );
};
