import { forwardRef, memo } from 'react';
import { TIngredient } from '@shared/types';
import { IngredientCard } from '../IngredientCard';
import { ETabs } from '../../tabs.enum';
import { titles } from '../../titles.const';
import classNames from 'classnames';
import classes from './ingredientsCategoryGroup.module.css';

interface IIngredientsCategoryGroupProps {
  titleKey: ETabs;
  items: TIngredient[];
}

export const IngredientsCategoryGroup = memo(
  forwardRef<HTMLDivElement, IIngredientsCategoryGroupProps>(
    ({ items, titleKey }, ref) => {
      return (
        <div ref={ref} className={classes.category}>
          <h3
            className={classNames(
              classes.category__title,
              'text text_type_main-medium'
            )}>
            {titles[titleKey]}
          </h3>
          <ul className={classes.category__list}>
            {items?.length ? (
              items.map((item) => (
                <li className={classes.category__item} key={item._id}>
                  <IngredientCard ingredient={item} />
                </li>
              ))
            ) : (
              <p className='text text_type_main-default text_color_inactive'>
                К сожалению, {titles[titleKey].toLowerCase()} не найдены
              </p>
            )}
          </ul>
        </div>
      );
    }
  )
);
