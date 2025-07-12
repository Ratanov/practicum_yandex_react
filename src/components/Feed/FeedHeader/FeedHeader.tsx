import { FC } from 'react';
import classNames from 'classnames';
import classes from './feedHeader.module.css';

export const FeedHeader: FC = () => {
  return (
    <h1
      className={classNames(classes.feed__header, 'text text_type_main-large')}>
      Лента заказов
    </h1>
  );
};
