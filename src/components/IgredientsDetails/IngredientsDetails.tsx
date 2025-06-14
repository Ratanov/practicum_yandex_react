import { FC } from 'react';
import { TIngredient } from '@shared/types';
import classes from './ingredientsDetails.module.css';

type TNutritionValue = keyof Pick<
  TIngredient,
  'calories' | 'proteins' | 'fat' | 'carbohydrates'
>;

interface INutritionItem {
  title: string;
  value: TNutritionValue;
}

const NUTRITION_ITEMS: readonly INutritionItem[] = [
  { title: 'Калории, калл', value: 'calories' },
  { title: 'Белки, г', value: 'proteins' },
  { title: 'Жиры, г', value: 'fat' },
  { title: 'Углеводы, г', value: 'carbohydrates' },
] as const;

interface IIngredientDetailsProps {
  ingredient: TIngredient;
}

export const IngredientsDetails: FC<IIngredientDetailsProps> = ({
  ingredient,
}) => {
  return (
    <div className={classes.details}>
      <figure className={classes.details__figure}>
        <img
          src={ingredient.image}
          alt={`${ingredient.name} изображение`}
          className={classes.details__image}
        />
        <figcaption className='text text_type_main-medium'>
          {ingredient.name}
        </figcaption>
      </figure>
      <ul className={classes.details__nutrition}>
        {NUTRITION_ITEMS.map(({ title, value }) => (
          <li key={value} className={classes['details__nutrition-item']}>
            <span className='text text_type_main-default text_color_inactive'>
              {title}
            </span>
            <p className='text text_type_main-default text_color_inactive'>
              {ingredient[value]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
