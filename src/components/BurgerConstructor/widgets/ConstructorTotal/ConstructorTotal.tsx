import { FC, FormEventHandler, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@shared/services/hooks';
import { RootState } from '@shared/services/store/store';
import { postOrder } from '@shared/services/reducers/orderSlice';
import {
  setBun,
  setIngredients,
} from '@shared/services/reducers/selectedIngredientsSlice';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal, OrderDetails } from '@components/index';
import classNames from 'classnames';
import classes from './constructorTotal.module.css';
import { useNavigate } from 'react-router-dom';

export const ConstructorTotal: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const { selectedBun, selectedIngredients } = useSelector(
    (state: RootState) => state.selectedIngredients
  );
  const { isLoading, name, error, order, orderItems } = useAppSelector(
    (state) => state.order
  );
  const { isAuth } = useAppSelector((state) => state.user);

  const createOrder = useCallback(async (orderItems: string[]) => {
    try {
      await dispatch(postOrder({ ingredients: orderItems }));

      setModalState(true);

      dispatch(setBun(null));
      dispatch(setIngredients([]));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const formSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!isAuth) {
      navigate('/login');
      return;
    }
    createOrder(orderItems);
  };

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

  return (
    <>
      {modalState && (
        <Modal title={name || ''} onClose={() => setModalState(false)}>
          {!error && order ? (
            <OrderDetails orderNumber={order.number} />
          ) : (
            error
          )}
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
        <Button htmlType='submit' disabled={orderItems.length === 0}>
          {isLoading ? 'Оформление заказа...' : 'Оформить заказ'}
        </Button>
      </form>
    </>
  );
};
