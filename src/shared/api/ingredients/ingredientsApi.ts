import type {
  TIngredient,
  TApiResponse,
  TApiOrderRequest,
  TApiOrderResponse,
} from '@shared/api';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  getIngredients: async (): Promise<TApiResponse<Array<TIngredient>>> => {
    try {
      const response = await fetch(`${BASE_URL}/ingredients`);

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

  /**
   * Отправка заказа
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  postOrder: async (data: TApiOrderRequest): Promise<TApiOrderResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: TApiOrderResponse = await response.json();
      return result;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  },
};
