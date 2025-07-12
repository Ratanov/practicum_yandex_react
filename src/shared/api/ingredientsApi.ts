import type {
  TIngredient,
  TApiResponse,
  TOrderRequest,
  TOrderResponse,
} from '@shared/types';
import { Api } from '@shared/utils';

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  getIngredients: () =>
    Api.request<TApiResponse<Array<TIngredient>>>({
      url: 'ingredients'
    }),

  /**
   * Отправка заказа
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  createOrder: (data: TOrderRequest) =>
    Api.request<TOrderResponse>({
      url: 'orders',
      method: 'POST',
      data,
    }),
};
