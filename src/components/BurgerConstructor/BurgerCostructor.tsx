import { FC } from 'react';
import { useSelectedIngredients } from '@shared/contexts';
import { ConstructorTotal, Bun, Ingredients } from './widgets';
import classes from './burgerConstructor.module.css';
import { selectedBunTest, selectedIngredientsTest } from './burgerCostructorMocks';

export const BurgerConstructor: FC = () => {
  const { selectedBun, selectedIngredients } = useSelectedIngredients();

  return (
    <section className={classes['constructor']}>
      <article className={classes['constructor__content']}>
        <Bun bun={selectedBunTest} orientation='top' />
        <Ingredients selectedIngredients={selectedIngredientsTest} />
        <Bun bun={selectedBunTest} orientation='bottom' />
      </article>
      <ConstructorTotal />
    </section>
  );
};
