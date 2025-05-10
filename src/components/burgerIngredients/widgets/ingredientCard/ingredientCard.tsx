import { FC, useCallback, useMemo, useState } from 'react';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelectedIngredients } from '@shared/contexts';
import { TIngredient } from '@shared/api';
import { IngredientsDetails, Modal } from '@components/index';
import classNames from 'classnames';
import classes from './ingredientCard.module.css';

type TIngredientsProps = {
  ingredient: TIngredient;
};

export const IngredientCard: FC<TIngredientsProps> = ({ ingredient }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const { selectedBun, selectedIngredients } = useSelectedIngredients();

  const handleClick = useCallback(() => {
    setModalState(true);
  }, []);

  const count = useMemo(() => {
    if (selectedBun && selectedBun._id === ingredient._id) {
      return 1;
    }

    if (selectedIngredients) {
      return selectedIngredients.filter((item) => item._id === ingredient._id)
        .length;
    }

    return 0;
  }, [selectedBun, selectedIngredients, ingredient]);

  return (
    <>
      <div className={classes.card} onClick={handleClick}>
        {count ? <Counter count={count} size='default' /> : null}
        <img
          src={ingredient.image}
          alt={`${ingredient.name} изображение`}
          className={classes.card__image}
        />
        <span
          className={classNames(
            classes.card__price,
            'text text_type_main-default'
          )}>
          {ingredient.price}
          <CurrencyIcon type='primary' />
        </span>
        <p
          className={classNames(
            classes.card__title,
            'text text_type_main-default'
          )}>
          {ingredient.name}
        </p>
      </div>
      {modalState && (
        <Modal onClose={() => setModalState(false)} title='Детали ингредиента'>
          <IngredientsDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};
