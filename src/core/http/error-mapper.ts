export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export function mapResponseToError(response: Response, body?: unknown): ApiError {
  const message =
    body && typeof body === 'object' && 'message' in body && typeof (body as { message: unknown }).message === 'string'
      ? (body as { message: string }).message
      : response.statusText || 'Error de conexión';

  return {
    message,
    status: response.status,
  };
}
