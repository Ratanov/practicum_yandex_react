import { FC } from 'react';

type TOrdersCountProps = {
  title: string;
  count?: number;
};

export const OrdersCount: FC<TOrdersCountProps> = ({ title, count }) => {
  return (
    <div>
      <h3 className={'text text_type_main-medium'}>{title}</h3>
      <span className={'text text_type_digits-large'}>{count}</span>
    </div>
  );
};
