import { FC } from 'react';
import { TFeedOrderItem } from '@shared/types';
import classes from './detailsHeader.module.css';
import classNames from 'classnames';

export const DetailsHeader: FC<Pick<TFeedOrderItem, 'number'>> = ({
  number,
}) => {
  return (
    <h2
      className={classNames(
        classes.order__title,
        'text text_type_digits-default'
      )}>
      #{number}
    </h2>
  );
};
