import { FC } from 'react';
import { useSelectedIngredients } from '@shared/contexts';
import { ConstructorTotal, Bun, Ingredients } from './widgets';
import classes from './burgerConstructor.module.css';

export const BurgerConstructor: FC = () => {
  const { selectedBun, selectedIngredients } = useSelectedIngredients();

  return (
    <section className={classes['constructor']}>
      <article className={classes['constructor__content']}>
        <Bun bun={selectedBun} orientation='top' />
        <Ingredients selectedIngredients={selectedIngredients} />
        <Bun bun={selectedBun} orientation='bottom' />
      </article>
      <ConstructorTotal />
    </section>
  );
};
