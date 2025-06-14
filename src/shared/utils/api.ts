import { checkResponse } from './checkResponse';
import { getCookie, setCookie } from './cookie';
import { TTokenRequest, TUpdateResponse } from '@shared/types';

type TApiRequest = {
  url: keyof typeof Api.endpoints;
  method?: 'GET' | 'PATCH' | 'POST';
  options?: RequestInit;
  data?: object;
};

export class Api {
  private static BASE_URL = 'https://norma.nomoreparties.space/api';

  static readonly endpoints = {
    ingredients: {
      url: `${this.BASE_URL}/ingredients`,
      protected: false,
    },
    orders: {
      url: `${this.BASE_URL}/orders`,
      protected: true,
    },
    login: {
      url: `${this.BASE_URL}/auth/login`,
      protected: false,
    },
    register: {
      url: `${this.BASE_URL}/auth/register`,
      protected: false,
    },
    logout: {
      url: `${this.BASE_URL}/auth/logout`,
      protected: true,
    },
    token: {
      url: `${this.BASE_URL}/auth/token`,
      protected: false,
    },
    user: {
      url: `${this.BASE_URL}/auth/user`,
      protected: true,
    },
    forgotPassword: {
      url: `${this.BASE_URL}/password-reset`,
      protected: false,
    },
    resetPassword: {
      url: `${this.BASE_URL}/password-reset/reset`,
      protected: false,
    },
  } as const;

  static async refreshToken(): Promise<TUpdateResponse> {
    const refreshToken = getCookie('refreshToken');

    try {
      const refresh = await fetch(this.endpoints.token.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken } as TTokenRequest),
      });

      const result = await checkResponse<TUpdateResponse>(refresh);

      if (result.success) {
        setCookie('accessToken', result.accessToken, 1);
        setCookie('refreshToken', result.refreshToken, 1);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async request<T>(params: Omit<TApiRequest, 'withToken'>): Promise<T> {
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const endpoint = this.endpoints[params.url];

    if (endpoint.protected) {
      try {
        const result = await this.refreshToken();
        defaultHeaders.authorization = result.accessToken;
      } catch (error) {
        console.error(error);
      }
    }

    try {
      const url = endpoint.url;
      const method = params.method || 'GET';

      if (method === 'GET') {
        const response = await fetch(url, {
          method,
          headers: defaultHeaders,
        });

        return checkResponse<T>(response);
      }

      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: JSON.stringify(params.data),
      });

      return checkResponse<T>(response);
    } catch (error) {
      return Promise.reject({ error });
    }
  }
}

export const refreshToken = Api.refreshToken.bind(Api);
