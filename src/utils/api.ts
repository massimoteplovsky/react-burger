import { TApiOptions } from './prop-validator';
export const ENDPOINT = 'https://norma.nomoreparties.space/api';
const REQUEST_ERRORS = [400, 500];

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

const createRequest = (onRequestFail: () => void) => {
  return async <T>(url: string, options: TApiOptions = null): Promise<T> => {
    try {
      const response = await fetch(`${ENDPOINT}/${url}`, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const isJsonResponse = response.headers
        .get('content-type')
        ?.includes('application/json');
      const data = isJsonResponse ? await response.json() : null;

      if (!response.ok) {
        if (REQUEST_ERRORS.includes(response.status)) {
          onRequestFail();
        }
        if (data) {
          return Promise.reject(data);
        }
        throw new Error();
      }

      return data;
    } catch (error) {
      throw new Error();
    }
  };
};

export default createRequest;
