export class ApiUtils {
  private static BASE_URL = 'https://norma.nomoreparties.space/api';

  static async checkResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(
        error.message || error.error || `HTTP error! status: ${res.status}`
      );
    }
    return res.json();
  }

  static handleError(error: unknown): never {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }

  static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      return await fetch(`${this.BASE_URL}${endpoint}`, options).then((res) =>
        this.checkResponse<T>(res)
      );
    } catch (error) {
      return this.handleError(error);
    }
  }
}
