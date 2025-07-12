import { FC } from 'react';
import classes from './ordersNumberList.module.css';
import classNames from 'classnames';

type TOrdersNumberList = {
  title: string;
  isDone?: boolean;
  numbers?: number[];
};

export const OrdersNumberList: FC<TOrdersNumberList> = ({
  title,
  numbers = [],
  isDone = false,
}) => {
  return (
    <div className={classes.orders}>
      <h4 className={'text text_type_main-medium'}>{title}</h4>
      <ul className={classes.orders__list}>
        {numbers.map((number) => (
          <li
            key={number}
            className={classNames(
              classes.orders__item,
              'text text_type_digits-default',
              isDone && classes['orders__item_done']
            )}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};
