import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '@shared/services/hooks';
import { Spinner } from '@components/Spinner';
import { ETabs } from './tabs.enum';
import {
  IngredientsTabs,
  ConstructorTitle,
  IngredientsCategoryGroup,
} from './widgets';
import classes from './burgerIngredients.module.css';

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState<ETabs>(ETabs.BUN);
  const { ingredients, isLoading } = useAppSelector(
    (state) => state.ingredients
  );
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const CATEGORIES = [
    { key: ETabs.BUN, filterKey: 'buns', ref: bunRef },
    { key: ETabs.SAUCE, filterKey: 'sauces', ref: sauceRef },
    { key: ETabs.MAIN, filterKey: 'mains', ref: mainRef },
  ] as const;

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

  const handleTabClick = useCallback(
    (value: ETabs) => {
      const tabRefs = {
        [ETabs.BUN]: bunRef,
        [ETabs.SAUCE]: sauceRef,
        [ETabs.MAIN]: mainRef,
      };

      const selectedTabRef = tabRefs[value];

      selectedTabRef.current?.scrollIntoView({ behavior: 'smooth' });

      setActiveTab(value);
    },
    [bunRef, sauceRef, mainRef]
  );

  const handleScroll = useCallback(() => {
    const positions = {
      buns: bunRef.current?.getBoundingClientRect().top || 0,
      sauces: sauceRef.current?.getBoundingClientRect().top || 0,
      mains: mainRef.current?.getBoundingClientRect().top || 0,
      container: containerRef.current?.getBoundingClientRect().top || 0,
    };

    const calculateDiff = (position: number) =>
      Math.abs(positions.container - position);

    const tabMap: { [key: string]: number } = {
      [ETabs.BUN]: calculateDiff(positions.buns),
      [ETabs.SAUCE]: calculateDiff(positions.sauces),
      [ETabs.MAIN]: calculateDiff(positions.mains),
    };

    const minTab = Object.keys(tabMap).reduce((a, b) =>
      tabMap[a] < tabMap[b] ? a : b
    ) as ETabs;

    setActiveTab(minTab);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={classes.ingredients}>
      <ConstructorTitle />
      <IngredientsTabs activeTab={activeTab} setActiveTab={handleTabClick} />
      <section ref={containerRef} className={classes.ingredients__content}>
        {isLoading ? (
          <Spinner description='Загрузка ингредиентов...' />
        ) : (
          <>
            {CATEGORIES.map(({ ref, key, filterKey }) => (
              <IngredientsCategoryGroup
                ref={ref}
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
