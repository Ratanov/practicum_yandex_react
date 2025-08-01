import { ComponentProps, FC, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@shared/services/store/store';
import { useAppSelector } from '@shared/services/hooks';
import { setBun } from '@shared/services/reducers/selectedIngredientsSlice';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import classes from './bun.module.css';

interface IBunProps {
  orientation: Required<ComponentProps<typeof ConstructorElement>['type']>;
}

export const Bun: FC<IBunProps> = ({ orientation }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBun } = useAppSelector((state) => state.selectedIngredients);

  const bunTitle = useMemo(() => {
    switch (orientation) {
      case 'top':
        return selectedBun?.name + ' (верх)';
      case 'bottom':
        return selectedBun?.name + ' (низ)';
      default:
        return selectedBun?.name || '';
    }
  }, [selectedBun, orientation]);

  const handleClose = useCallback(() => {
    dispatch(setBun(null));
  }, [dispatch]);

  if (!selectedBun) {
    return (
      <div
        className={classNames(
          classes.bun,
          classes['bun__empty'],
          classes[`bun__empty_${orientation}`],
          'text text_type_main-default'
        )}>
        Булка не выбрана
        <span className='constructor-element__action pr-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='#8585AD'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6 7V10H4C2.89543 10 2 10.8954 2 12V21C2 22.1046 2.89543 23 4 23H20C21.1046 23 22 22.1046 22 21V12C22 10.8954 21.1046 10 20 10H18V7C18 3.68629 15.3137 1 12 1C8.68632 1 6 3.68629 6 7ZM12 3C9.79088 3 8 4.79086 8 7V10H16V7C16 4.79086 14.2091 3 12 3ZM13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V15Z'></path>
          </svg>
        </span>
      </div>
    );
  }

  return (
    <div data-cy={`order-bun-${orientation}`}>
      <ConstructorElement
        type={orientation}
        price={selectedBun.price}
        text={bunTitle}
        thumbnail={selectedBun.image}
        extraClass={classes.bun}
        isLocked
        handleClose={handleClose}
      />
    </div>
  );
};
