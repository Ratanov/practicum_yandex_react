import { FC, FormEventHandler } from 'react';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import classes from './constructorTotal.module.css';

interface ConstructorTotalProps {
  count?: number;
}

export const ConstructorTotal: FC<ConstructorTotalProps> = ({ count }) => {
  const formSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={formSubmit} className={classes['total']}>
      <span
        className={classNames(
          'text text_type_main-large',
          classes['total__count']
        )}>
        {count}
        <CurrencyIcon type='primary' />
      </span>
      <Button htmlType='submit'>Оформить заказ</Button>
    </form>
  );
};
