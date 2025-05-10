import { ComponentProps, FC, useMemo } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelectedIngredients } from '@shared/contexts';
import type { TIngredient } from '@shared/api';
import classNames from 'classnames';
import classes from './bun.module.css';

type TBunProps = {
  bun: TIngredient | null;
  orientation: Required<ComponentProps<typeof ConstructorElement>['type']>;
};

export const Bun: FC<TBunProps> = ({ bun, orientation }) => {
  const { setSelectedBun } = useSelectedIngredients();

  const bunTitle = useMemo(() => {
    switch (orientation) {
      case 'top':
        return bun?.name + ' (верх)';
      case 'bottom':
        return bun?.name + ' (низ)';
      default:
        return bun?.name || '';
    }
  }, [bun]);

  if (!bun) {
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
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M6 7V10H4C2.89543 10 2 10.8954 2 12V21C2 22.1046 2.89543 23 4 23H20C21.1046 23 22 22.1046 22 21V12C22 10.8954 21.1046 10 20 10H18V7C18 3.68629 15.3137 1 12 1C8.68632 1 6 3.68629 6 7ZM12 3C9.79088 3 8 4.79086 8 7V10H16V7C16 4.79086 14.2091 3 12 3ZM13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V15Z'></path>
          </svg>
        </span>
      </div>
    );
  }

  return (
    <ConstructorElement
      type={orientation}
      price={bun.price}
      text={bunTitle}
      thumbnail={bun.image}
      extraClass={classes.bun}
      isLocked
      handleClose={() => setSelectedBun?.(null)}
    />
  );
};
