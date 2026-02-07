import { getApiBaseUrl } from '../config/env.js';
import { getStoredToken } from '../auth/token.storage.js';
import { mapResponseToError, type ApiError } from './error-mapper.js';

async function getHeaders(customHeaders?: HeadersInit): Promise<Headers> {
  const headers = new Headers(customHeaders);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const token = getStoredToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}

export async function httpClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const pathNorm = path.startsWith('/') ? path : `/${path}`;
  const url = path.startsWith('http') ? path : `${baseUrl}${pathNorm}`;
  const headers = await getHeaders(options.headers);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let body: unknown;
  const contentType = response.headers.get('Content-Type');
  if (contentType?.includes('application/json')) {
    try {
      body = await response.json();
    } catch {
      body = null;
    }
  } else {
    body = await response.text();
  }

  if (!response.ok) {
    const error: ApiError = mapResponseToError(response, body);
    throw error;
  }

  return body as T;
}
