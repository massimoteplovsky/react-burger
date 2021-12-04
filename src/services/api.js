export const ENDPOINT = 'https://norma.nomoreparties.space/api';

const request = async (url, options = null) => {
  try {
    const response = await fetch(`${ENDPOINT}/${url}`, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error();
  } catch (err) {
    throw new Error(err);
  }
};

export default request;
