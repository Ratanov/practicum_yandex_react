import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@shared/services/hooks';
import { IngredientsDetails } from '@components/index';

export const ModalIngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredient = useAppSelector((state) =>
    state.ingredients.ingredients.find((item) => item._id === id)
  );

  if (!ingredient) {
    return null;
  }

  return <IngredientsDetails ingredient={ingredient} />;
};
