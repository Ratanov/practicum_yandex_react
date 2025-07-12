import { FC } from 'react';
import { TFeedOrderItem, TIngredient } from '@shared/types';
import { DetailsContentHeader } from './DetailsContentHeader';
import { DetailsContentListItem } from './DetailsContentListItem';
import classes from './detailsContent.module.css';

export const DetailsContent: FC<
  Pick<TFeedOrderItem, 'name' | 'status'> & {
    ingredients: { ingredient: TIngredient; count: number }[];
  }
> = ({ ingredients, name, status }) => {
  return (
    <div className={classes.order}>
      <DetailsContentHeader name={name} status={status} />

      <div className={classes['order__list-container']}>
        <h4 className='text text_type_main-medium'>Состав: </h4>

        <ul className={classes.order__list}>
          {ingredients.map(({ count, ingredient }) => (
            <DetailsContentListItem
              key={ingredient._id}
              count={count}
              ingredient={ingredient}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
