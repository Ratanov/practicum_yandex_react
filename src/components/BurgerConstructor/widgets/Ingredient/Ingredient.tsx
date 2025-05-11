import { FC, useCallback, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useAppDispatch } from '@shared/services/hooks';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  removeIngredient,
  sortIngredients,
} from '@shared/services/reducers/selectedIngredientsSlice';
import { TSelectedIngredients } from '@shared/types';
import classes from './ingredient.module.css';

interface IIngredientsProps {
  selectedIngredient: TSelectedIngredients;
  currentIndex: number;
}

export const Ingredient: FC<IIngredientsProps> = ({
  selectedIngredient,
  currentIndex,
}) => {
  const dispatch = useAppDispatch();
  const elemRef = useRef<HTMLLIElement>(null);

  const handleDragSort = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (dragIndex === hoverIndex) return;

      dispatch(
        sortIngredients({
          fromIndex: dragIndex,
          toIndex: hoverIndex,
        })
      );
    },
    [dispatch]
  );

  const [, drop] = useDrop({
    accept: 'constructor-ingredient',
    hover(draggedItem: { index: number }) {
      handleDragSort(draggedItem.index, currentIndex);
      draggedItem.index = currentIndex;
    },
  });

  const [, drag] = useDrag({
    type: 'constructor-ingredient',
    item: { index: currentIndex },
  });

  drag(drop(elemRef));

  const handleRemoveIngredient = useCallback(
    (key: string) => {
      dispatch(removeIngredient(key));
    },
    [dispatch]
  );

  const { name, price, image, __key } = selectedIngredient;

  return (
    <li ref={elemRef} className={classes.ingredient}>
      <DragIcon type='primary' />
      <ConstructorElement
        price={price}
        text={name}
        thumbnail={image}
        handleClose={() => handleRemoveIngredient(__key)}
      />
    </li>
  );
};
