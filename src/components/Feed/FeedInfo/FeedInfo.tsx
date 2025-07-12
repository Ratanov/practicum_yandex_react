import { FC, useMemo } from 'react';
import { useAppSelector } from '@shared/services/hooks';
import { timeFormatter } from '@shared/utils';
import { OrdersNumberList } from '../OrdersNumberList';
import { OrdersCount } from '../OrdersCount';
import classes from './feedInfo.module.css';

export const FeedInfo: FC = () => {
  const orders = useAppSelector((state) => state.feeds.orders);
  const { total, totalToday } = useAppSelector((state) => ({
    total: state.feeds.total,
    totalToday: state.feeds.totalToday,
  }));

  const { todayDoneOrders, todayPendingOrders } = useMemo(() => {
    return {
      todayDoneOrders: orders.filter(
        (order) =>
          order.status === 'done' &&
          timeFormatter.isWithinLastDay(order.createdAt)
      ),
      todayPendingOrders: orders.filter(
        (order) =>
          order.status === 'pending' &&
          timeFormatter.isWithinLastDay(order.createdAt)
      ),
    };
  }, [orders]);

  return (
    <section className={classes.feed}>
      <div className={classes.feed__orders}>
        <OrdersNumberList
          title='Готовы:'
          isDone
          numbers={todayDoneOrders.map((order) => order.number)}
        />
        <OrdersNumberList
          title='В работе:'
          numbers={todayPendingOrders.map((order) => order.number)}
        />
      </div>
      {total && <OrdersCount title='Выполнено за все время:' count={total} />}
      {totalToday && (
        <OrdersCount title='Выполнено за сегодня:' count={totalToday} />
      )}
    </section>
  );
};
