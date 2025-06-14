import type {
  TLoginRequest,
  TRegisterRequest,
  TTokenRequest,
  TAuthResponse,
  TMessageResponse,
} from '@shared/types';
import { Api } from '@shared/utils';

export const authApi = {
  /**
   * Авторизация
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  login: (data: TLoginRequest) =>
    Api.request<TAuthResponse>({
      url: 'login',
      method: 'POST',
      data,
    }),

  /**
   * Регистрация
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  register: (data: TRegisterRequest) =>
    Api.request<TAuthResponse>({
      url: 'register',
      method: 'POST',
      data,
    }),

  /**
   * Выход
   * @throws {Error} При ошибке сети или невалидном ответе
   */
  logout: (data: TTokenRequest) =>
    Api.request<TMessageResponse>({
      url: 'logout',
      method: 'POST',
      data,
    }),
};
