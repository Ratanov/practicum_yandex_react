import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@shared/services/hooks';
import { DetailsHeader, DetailsContent, DetailsFooter } from './widgets';
import { TIngredient } from '@shared/types';
import classes from './orderByIdDetails.module.css';

export const OrderByIdDetails: FC<{ type: 'feed' | 'profile' }> = ({
  type,
}) => {
  const { id } = useParams();
  const orders = useAppSelector((state) =>
    type === 'feed' ? state.feeds.orders : state.user.orders
  );
  const ingredientsHash = useAppSelector(
    (state) => state.ingredients.ingredientsHash
  );

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order._id === id);
  }, [id, orders]);

  const { ingredientsWithCount, totalPrice } = useMemo(() => {
    let totalPrice = 0;

    const ingredientsWithCount = selectedOrder?.ingredients.reduce(
      (prev, curr) => {
        totalPrice += ingredientsHash[curr].price;

        if (!prev[curr]) {
          prev[curr] = { ingredient: ingredientsHash[curr], count: 1 };

          return prev;
        }

        prev[curr].count += 1;

        return prev;
      },
      {} as Record<string, { ingredient: TIngredient; count: number }>
    );

    return { ingredientsWithCount, totalPrice };
  }, [selectedOrder?.ingredients]);

  if (!selectedOrder || !ingredientsWithCount)
    return <h3 className='text text_type_main-medium'>Заказ не найден</h3>;

  return (
    <section className={classes.order}>
      <DetailsHeader number={selectedOrder.number} />
      <DetailsContent
        ingredients={Object.values(ingredientsWithCount)}
        name={selectedOrder.name}
        status={selectedOrder.status}
      />
      <DetailsFooter
        createdAt={selectedOrder.createdAt}
        totalPrice={totalPrice}
      />
    </section>
  );
};
