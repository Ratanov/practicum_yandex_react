import { FC } from 'react';
import { TFeedOrderItem } from '@shared/types';

export const OrdersCardTitle: FC<Pick<TFeedOrderItem, 'name'>> = ({ name }) => {
  return <span className='text text_type_main-medium'>{name}</span>;
};
