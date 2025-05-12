import type {
  TIngredient,
  TApiResponse,
  TApiOrderRequest,
  TApiOrderResponse,
} from '@shared/api';
import { ApiUtils } from '@shared/utils';

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  getIngredients: () =>
    ApiUtils.request<TApiResponse<Array<TIngredient>>>('/ingredients'),

  /**
   * Отправка заказа
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  postOrder: (data: TApiOrderRequest) =>
    ApiUtils.request<TApiOrderResponse>('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
};
