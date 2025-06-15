import {
  TForgotPasswordRequest,
  TResetPasswordRequest,
  TMessageResponse,
} from '@shared/types';
import { Api } from '@shared/utils';

export const passwordApi = {
  /**
   * Проверка на наличие аккаунта по email
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  forgotPassword: (data: TForgotPasswordRequest) =>
    Api.request<TMessageResponse>({
      url: 'forgotPassword',
      method: 'POST',
      data,
    }),

  /**
   * Сброс пароля
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  resetPassword: (data: TResetPasswordRequest) =>
    Api.request<TMessageResponse>({
      url: 'resetPassword',
      method: 'POST',
      data,
    }),
};
