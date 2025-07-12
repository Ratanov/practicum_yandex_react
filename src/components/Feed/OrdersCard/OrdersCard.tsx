import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OrdersCardBody, OrdersCardHeader, OrdersCardTitle } from './widgets';
import { TFeedOrderItem } from '@shared/types';
import classes from './ordersCard.module.css';

export const OrdersCard: FC<TFeedOrderItem> = (props) => {
  const location = useLocation();

  return (
    <li className={classes['orders-card']}>
      <Link
        to={props._id}
        state={{ background: location }}
        className={classes['orders-card__link']}>
        <OrdersCardHeader number={props.number} createdAt={props.createdAt} />
        <OrdersCardTitle name={props.name} />
        <OrdersCardBody ingredients={props.ingredients} />
      </Link>
    </li>
  );
};
