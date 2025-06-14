import { FC } from 'react';
import { PageContainer, BurgerIngredients, BurgerConstructor } from '@components/index';
import classes from './constructorPage.module.css';

export const ConstructorPage: FC = () => {
  return (
    <PageContainer className={classes["constructor"]}>
      <BurgerIngredients />
      <BurgerConstructor />
    </PageContainer>
  );
};
