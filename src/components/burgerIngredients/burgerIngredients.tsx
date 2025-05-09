import { useCallback, useEffect, useMemo, useState } from 'react';
import { TIngredient } from '@shared/api';
import { ingredientsApi } from '@shared/api';

import { ETabs } from './tabs.enum';
import {
  IngredientsTabs,
  ConstructorTitle,
  IngredientsCategoryGroup,
} from './widgets';
import classes from './burgerIngredients.module.css';

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState<ETabs>(ETabs.BUN);
  const [ingredients, setIngredients] = useState<Array<TIngredient>>([]);

  const buns = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === ETabs.BUN),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === ETabs.SAUCE),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === ETabs.MAIN),
    [ingredients]
  );

  const loadAndSetIngredients = useCallback(async () => {
    const ingredientsResponse = await ingredientsApi.getAll();

    if (ingredientsResponse?.error) {
      return;
    }

    if (ingredientsResponse?.data) {
      setIngredients(ingredientsResponse.data);
    }
  }, []);

  useEffect(() => {
    loadAndSetIngredients();
  }, [loadAndSetIngredients]);

  return (
    <section className={classes['ingredients']}>
      <ConstructorTitle />
      <IngredientsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className={classes['ingredients__container']}>
        <IngredientsCategoryGroup items={buns} title={ETabs.BUN} />
        <IngredientsCategoryGroup items={sauces} title={ETabs.SAUCE} />
        <IngredientsCategoryGroup items={mains} title={ETabs.MAIN} />
      </section>
    </section>
  );
};
