import { FC } from 'react';
import { TIngredient } from '@shared/api';

import classes from './constructorItems.module.css';

interface ConstructorItemsProps {
  ingredients?: TIngredient;
}

export const ConstructorItems: FC<ConstructorItemsProps> = () => {
  return <article className={classes['items']}>ConstructorItems</article>;
};
