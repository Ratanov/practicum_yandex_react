import { FC } from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@shared/services/hooks';
import { IngredientsDetails, PageContainer } from '@components/index';

export const IngredientPage: FC = () => {
  const { id } = useParams();
  const { ingredientsHash } = useAppSelector((state) => state.ingredients);

  const selectedIngredient = useMemo(() => {
    if (typeof id === 'string') {
      return ingredientsHash[id];
    }
    return null;
  }, [id, ingredientsHash]);

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
