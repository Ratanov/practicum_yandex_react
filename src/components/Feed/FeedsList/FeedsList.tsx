import { FC } from 'react';
import { useAppSelector } from '@shared/services/hooks';
import { OrdersCard } from '../OrdersCard';
import classes from './feedsList.module.css';

export const FeedList: FC = () => {
  const orders = useAppSelector((state) => state.feeds.orders);

  if (!orders) return null;

  return (
    <ul className={classes.feed__list}>
      {orders.map((order) => (
        <OrdersCard key={order._id} {...order} />
      ))}
    </ul>
  );
};
