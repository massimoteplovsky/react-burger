export const ENDPOINT = 'https://norma.nomoreparties.space/api';
const REQUEST_ERRORS = [400, 500];

const createRequest = (onRequestFail) => {
  const request = async (url, options = null) => {
    try {
      const response = await fetch(`${ENDPOINT}/${url}`, options);
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

  return request;
};

export default createRequest;
