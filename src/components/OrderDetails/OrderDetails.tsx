import { FC } from 'react';
import { donePng } from '@shared/img';
import classes from './orderDetails.module.css';

export const OrderDetails: FC = () => {
  return (
    <div className={classes.order}>
      <div className={classes.order__header}>
        <h2 className='text text_type_digits-large'>034536</h2>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
      </div>
      <img src={donePng} alt='Иконка готового заказа' />
      <div className={classes.order__footer}>
        <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive'>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
};
