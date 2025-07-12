import { FC } from 'react';
import { TFeedOrderItem } from '@shared/types';
import classes from './detailsFooter.module.css';
import { timeFormatter } from '@shared/utils';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

export const DetailsFooter: FC<
  Pick<TFeedOrderItem, 'createdAt'> & { totalPrice: number }
> = ({ createdAt, totalPrice }) => {
  return (
    <div className={classNames(classes.order__footer)}>
      <span
        className='
        text text_type_main-default text_color_inactive'>
        {timeFormatter.formatToRussian(createdAt)}
      </span>
      <span
        className={classNames(
          classes['order__total-price'],
          'text text_type_digits-default'
        )}>
        {totalPrice} <CurrencyIcon type='primary' />
      </span>
    </div>
  );
};
