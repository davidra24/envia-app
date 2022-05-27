const HTTP_URL = 'https://enviaservices.404namenotfound.live/api';

interface ClientModel<T> {
  baseUrl?: string;
  endpoint?: string;
  method?: string;
  headers?: Headers;
  body?: T;
  typeResponse?: string;
}

const controller = new AbortController();
setTimeout(() => controller.abort(), 30000);

const defaultHeaders = new Headers();
defaultHeaders.append('Content-Type', 'application/json');

export const getResource = async <T, U>({
  baseUrl = HTTP_URL,
  endpoint,
  method = 'GET',
  headers = defaultHeaders
}: ClientModel<T>): Promise<U> => {
  try {
    const URI_RESOURCE = `${baseUrl}/${endpoint}`;
    console.log(URI_RESOURCE);
    const response = await fetch(URI_RESOURCE, {
      method,
      headers
      //signal: controller.signal
    });
    console.log(response.status);

    if (response.ok) {
      return await response.json();
    } else {
      return Promise.reject(undefined);
    }
  } catch (error) {
    return Promise.reject(undefined);
  }
};

export const getTextResource = async <T>({
  baseUrl = HTTP_URL,
  endpoint,
  method = 'GET',
  headers = defaultHeaders
}: ClientModel<T>) => {
  try {
    const URI_RESOURCE = `${baseUrl}/${endpoint}`;
    console.log(URI_RESOURCE);

    const response = await fetch(URI_RESOURCE, {
      method,
      headers
      //signal: controller.signal
    });
    if (response.ok) {
      const text = await response.text();
      return text;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const postResource = async <T, U>({
  baseUrl = HTTP_URL,
  endpoint,
  method = 'POST',
  body,
  headers = defaultHeaders
}: ClientModel<T>): Promise<U> => {
  try {
    const URI_RESOURCE = `${baseUrl}/${endpoint}`;
    const response = await fetch(URI_RESOURCE, {
      method,
      headers,
      //signal: controller.signal,
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return (await response.json()) as U;
    } else {
      return Promise.reject(undefined);
    }
  } catch (error) {
    return Promise.reject(undefined);
  }
};

export const putResource = async <T, U>({
  baseUrl = HTTP_URL,
  endpoint,
  method = 'PUT',
  body,
  headers = defaultHeaders
}: ClientModel<T>): Promise<U> => {
  try {
    const URI_RESOURCE = `${baseUrl}/${endpoint}`;

    const response = await fetch(URI_RESOURCE, {
      method,
      headers,
      //signal: controller.signal,
      body: JSON.stringify({ data: body })
    });
    if (response.ok) {
      return (await response.json()) as U;
    } else {
      return Promise.reject(undefined);
    }
  } catch (error) {
    return Promise.reject(undefined);
  }
};
