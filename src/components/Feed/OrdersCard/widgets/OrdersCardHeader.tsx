import { FC } from 'react';
import { timeFormatter } from '@shared/utils';
import { TFeedOrderItem } from '@shared/types';
import classes from './ordersCardWidgets.module.css';

export const OrdersCardHeader: FC<
  Pick<TFeedOrderItem, 'number' | 'createdAt'>
> = ({ number, createdAt }) => {
  return (
    <div className={classes['orders-card__header']}>
      <span className='text text_type_digits-default'>#{number}</span>
      <span className='text text_type_main-default text_color_inactive'>
        {timeFormatter.formatToRussian(createdAt)}
      </span>
    </div>
  );
};
