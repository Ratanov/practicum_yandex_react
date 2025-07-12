import { useAppSelector } from '@shared/services/hooks';
import { OrdersCard } from '@components/Feed';
import classes from './userOrdersList.module.css';

export const UserOrdersList = () => {
  const orders = useAppSelector((state) => state.user.orders);

  if (!orders) return null;

  return (
    <ul className={classes.orders}>
      {orders.map((order) => (
        <OrdersCard key={order._id} {...order} />
      ))}
    </ul>
  );
};
