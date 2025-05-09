import { ComponentProps, FC } from 'react';
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

  if (!bun) {
    return (
      // <div className={classes.bun}>
        <div
          className={classNames(
            classes.bun,
            classes['bun__empty'],
            classes[`bun__empty_${orientation}`],
            'text text_type_main-default'
          )}>
          Булка не выбрана
        </div>
      // </div>
    );
  }

  return (
    // <div className={classes.bun}>
      <ConstructorElement
        type={orientation}
        price={bun.price}
        text={bun.name}
        thumbnail={bun.image}
        extraClass={classes.bun}
        isLocked
        handleClose={() => setSelectedBun?.(null)}
      />
    // </div>
  );
};
