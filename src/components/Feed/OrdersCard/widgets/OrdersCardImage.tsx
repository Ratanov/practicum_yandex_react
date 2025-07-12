import { FC } from 'react';
import { TIngredient } from '@shared/types';
import classes from './ordersCardWidgets.module.css';
import classNames from 'classnames';

type TOrdersCardImageProps = TIngredient & {
  moreThanSixComponentsCount: number | null;
  index: number;
};

export const OrdersCardImage: FC<TOrdersCardImageProps> = ({
  image,
  name,
  moreThanSixComponentsCount,
  index,
}) => {
  return (
    <li
      className={classes['orders-card__image-item']}
      style={{ transform: `translateX(-${index * 10}px)` }}
      title={name}>
      <figure className={classes['orders-card__image-wrapper']}>
        <img src={image} alt={name} />
        {moreThanSixComponentsCount && (
          <figcaption
            className={classNames(
              classes['orders-card__image-preview'],
              'text text_type_digits-default'
            )}>
            +{moreThanSixComponentsCount}
          </figcaption>
        )}
      </figure>
    </li>
  );
};
