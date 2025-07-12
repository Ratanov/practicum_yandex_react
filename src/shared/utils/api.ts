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
  private static PROTOCOL = {
    https: 'https://',
    wss: 'wss://',
  };
  private static BASE_URL = 'norma.nomoreparties.space';

  private static BASE_API: Record<keyof typeof this.PROTOCOL, string> = {
    https: this.PROTOCOL.https + this.BASE_URL,
    wss: this.PROTOCOL.wss + this.BASE_URL,
  };

  static readonly endpoints = {
    ingredients: {
      url: `${this.BASE_API.https}/api/ingredients`,
      protected: false,
    },
    orders: {
      url: `${this.BASE_API.https}/api/orders`,
      protected: true,
    },
    login: {
      url: `${this.BASE_API.https}/api/auth/login`,
      protected: false,
    },
    register: {
      url: `${this.BASE_API.https}/api/auth/register`,
      protected: false,
    },
    logout: {
      url: `${this.BASE_API.https}/api/auth/logout`,
      protected: true,
    },
    token: {
      url: `${this.BASE_API.https}/api/auth/token`,
      protected: false,
    },
    user: {
      url: `${this.BASE_API.https}/api/auth/user`,
      protected: true,
    },
    forgotPassword: {
      url: `${this.BASE_API.https}/api/password-reset`,
      protected: false,
    },
    resetPassword: {
      url: `${this.BASE_API.https}/api/password-reset/reset`,
      protected: false,
    },
    ws: {
      url: `${this.BASE_API.wss}/orders/all`,
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

      const result = await checkResponse.http<TUpdateResponse>(refresh);

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
        if (result.success)
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

        return checkResponse.http<T>(response);
      }

      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: JSON.stringify(params.data),
      });

      return checkResponse.http<T>(response);
    } catch (error) {
      return Promise.reject({ error });
    }
  }
}

export const refreshToken = Api.refreshToken.bind(Api);
