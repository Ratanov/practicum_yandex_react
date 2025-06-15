import { FC } from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@shared/services/hooks';
import { IngredientsDetails, PageContainer } from '@components/index';

export const IngredientPage: FC = () => {
  const { id } = useParams();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const selectedIngredient = useMemo(() => {
    const foundedIngredient = ingredients.find(
      (ingredient) => ingredient._id === id
    );

    return foundedIngredient;
  }, [id, ingredients]);

  return (
    <PageContainer className='flex-col-center'>
      {selectedIngredient ? (
        <IngredientsDetails ingredient={selectedIngredient} />
      ) : (
        <h3 className='text text_type_main-medium'>Ингредиент не найден</h3>
      )}
    </PageContainer>
  );
};
