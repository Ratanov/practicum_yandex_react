import type { TUserData, TUserResponse } from '@shared/types';
import { Api } from '@shared/utils';

export const userApi = {
  /**
   * Получение данных о пользователе
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  getUser: () =>
    Api.request<TUserResponse>({
      url: 'user',
    }),

  /**
   * Обновление данных о пользователе
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  updateUser: (data: TUserData) =>
    Api.request<TUserResponse>({
      url: 'user',
      method: 'PATCH',
      data,
    }),
};
