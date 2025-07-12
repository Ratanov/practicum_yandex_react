import { FC, useMemo } from 'react';
import { useAppSelector } from '@shared/services/hooks';
import { TFeedOrderItem } from '@shared/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrdersCardImage } from './OrdersCardImage';
import classNames from 'classnames';
import classes from './ordersCardWidgets.module.css';

export const OrdersCardBody: FC<Pick<TFeedOrderItem, 'ingredients'>> = ({
  ingredients,
}) => {
  const ingredientsHash = useAppSelector(
    (state) => state.ingredients.ingredientsHash
  );

  const price = useMemo(
    () =>
      ingredients.reduce((price, ingredientId) => {
        return price + ingredientsHash[ingredientId].price;
      }, 0),
    [ingredients, ingredientsHash]
  );

  const filteredComponents = useMemo(() => {
    return ingredients.reduce((components, ingredientId) => {
      if (
        ingredientsHash[ingredientId].type === 'bun' &&
        components.includes(ingredientId)
      ) {
        return components;
      }

      if (components.length === 6) {
        return components;
      }

      return [...components, ingredientId];
    }, [] as string[]);
  }, []);

  return (
    <div className={classes['orders-card__components']}>
      <ul className={classNames(classes['orders-card__image-list'])}>
        {filteredComponents.map((ingredientId, index) => (
          <OrdersCardImage
            key={ingredientId + index}
            index={index}
            {...ingredientsHash[ingredientId]}
            moreThanSixComponentsCount={
              index === 5 ? ingredients.length - 5 : null
            }
          />
        ))}
      </ul>
      <span
        className={classNames(
          classes['orders-card__price'],
          'text text_type_digits-default'
        )}>
        {price} <CurrencyIcon type='primary' />
      </span>
    </div>
  );
};
