import { useMemo, useState } from 'react';
import { Spinner } from '@components/Spinner';
import { useIngredients } from '@shared/contexts';
import { ETabs } from './tabs.enum';
import {
  IngredientsTabs,
  ConstructorTitle,
  IngredientsCategoryGroup,
} from './widgets';
import classes from './burgerIngredients.module.css';

const CATEGORIES = [
  { key: ETabs.BUN, filterKey: 'buns' },
  { key: ETabs.SAUCE, filterKey: 'sauces' },
  { key: ETabs.MAIN, filterKey: 'mains' },
] as const;

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState<ETabs>(ETabs.BUN);
  const { ingredients, isLoading } = useIngredients();

  const filteredItems = useMemo(() => {
    return {
      buns:
        ingredients?.filter((ingredient) => ingredient.type === ETabs.BUN) ||
        [],
      sauces:
        ingredients?.filter((ingredient) => ingredient.type === ETabs.SAUCE) ||
        [],
      mains:
        ingredients?.filter((ingredient) => ingredient.type === ETabs.MAIN) ||
        [],
    };
  }, [ingredients]);

  return (
    <section className={classes.ingredients}>
      <ConstructorTitle />
      <IngredientsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className={classes.ingredients__content}>
        {isLoading ? (
          <Spinner description='Загрузка ингредиентов...' />
        ) : (
          <>
            {CATEGORIES.map(({ key, filterKey }) => (
              <IngredientsCategoryGroup
                key={key}
                items={filteredItems[filterKey]}
                titleKey={key}
              />
            ))}
          </>
        )}
      </section>
    </section>
  );
};
