import { FC } from 'react';
import classNames from 'classnames';

import { TIngredient } from '@shared/api';
import { IngredientCard } from '../ingredientCard';
import classes from './ingredientsCategoryGroup.module.css';

interface IngredientsCategoryGroupProps {
  title: string;
  items: Array<TIngredient>;
}

export const IngredientsCategoryGroup: FC<IngredientsCategoryGroupProps> = ({
  items,
  title,
}) => {
  return (
    <article className={classes['category']}>
      <h3
        className={classNames(
          'text text_type_main-medium',
          classes['category__title']
        )}>
        {title}
      </h3>
      <ul className={classes['category__list']}>
        {items?.length ? (
          items.map((item) => (
            <li key={item._id}>
              <IngredientCard ingredient={item} />
            </li>
          ))
        ) : (
          <p className='text text_type_main-default text_color_inactive'>
            К сожалению, {title.toLowerCase()} не найдены
          </p>
        )}
      </ul>
    </article>
  );
};
