const HTTP_URL = 'https://envia-guide.herokuapp.com';

interface ClientModel<T, U> {
  baseUrl?: string;
  endpoint?: string;
  method?: string;
  headers?: Headers;
  body?: T;
}

export const getResource = async <T, U>({
  baseUrl = HTTP_URL,
  endpoint,
  method = 'GET',
  headers
}: ClientModel<T, U>) => {
  try {
    const URI_RESOURCE = `${baseUrl}/${endpoint}`;
    const response = await fetch(URI_RESOURCE, {
      method,
      headers
    });
    if (response.ok) {
      return await response.json();
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
};
