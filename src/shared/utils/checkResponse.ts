export const checkResponse = {
  /**
   * Проверяет HTTP ответ и возвращает JSON данные или выбрасывает ошибку.
   * @template T
   * @param {Response} res - HTTP ответ
   * @returns {Promise<T>} - JSON данные
   */
  http: <T = unknown>(res: Response): Promise<T> => {
    if (res.ok) {
      return res.json();
    }

    return res.json().then((err) => Promise.reject(err));
  },
  /**
   * Проверяет WS данные и возвращает их или выбрасывает ошибку при неудачном парсинге.
   * @param {string} data - WS данные
   * @returns {*} - WS данные
   */
  ws: (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.success === false) {
        throw new Error(parsedData.message || "Unknown error");
      }
      return parsedData;
    } catch (error) {
      throw new Error("Error parsing JSON data");
    }
  },
};
