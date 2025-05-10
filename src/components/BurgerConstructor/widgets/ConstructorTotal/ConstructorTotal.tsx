import { FC, FormEventHandler, useMemo, useState } from 'react';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelectedIngredients } from '@shared/contexts';
import { Modal, OrderDetails } from '@components/index';
import classNames from 'classnames';
import classes from './constructorTotal.module.css';

export const ConstructorTotal: FC = () => {
  const [modalState, setModalState] = useState(false);
  const { selectedBun, selectedIngredients } = useSelectedIngredients();

  const totalPrice = useMemo(() => {
    let total = 0;

    if (selectedBun) {
      total += selectedBun.price;
    }

    if (selectedIngredients) {
      total += selectedIngredients.reduce((prev, acc) => {
        return prev + acc.price;
      }, 0);
    }

    return total;
  }, [selectedBun, selectedIngredients]);

  const formSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setModalState(true);
  };

  return (
    <>
      {modalState && (
        <Modal onClose={() => setModalState(false)}>
          <OrderDetails />
        </Modal>
      )}
      <form onSubmit={formSubmit} className={classes.order}>
        <span
          className={classNames(
            classes['order__total'],
            'text text_type_main-large'
          )}>
          {totalPrice}
          <CurrencyIcon type='primary' />
        </span>
        <Button htmlType='submit'>Оформить заказ</Button>
      </form>
    </>
  );
};
