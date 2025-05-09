import type { TIngredient, TApiResponse } from '@shared/api';

const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  getAll: async (): Promise<TApiResponse<Array<TIngredient>>> => {
    try {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TApiResponse<Array<TIngredient>> = await response.json();
      return data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  },
};
