import classes from './burgerConstructor.module.css';
import { ConstructorItems, ConstructorTotal } from './widgets';

export const BurgerConstructor = () => {
  return (
    <section className={classes['constructor']}>
      <ConstructorItems />
      <ConstructorTotal count={400} />
    </section>
  );
};
