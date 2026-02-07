import { endpoints } from '../config/endpoints.js';
import { httpClient } from '../http/http.client.js';
import { getStoredToken } from './token.storage.js';
import type { LoginPayload, LoginResponse, User } from './types.js';

const MOCK_AUTH = import.meta.env.DEV && (import.meta.env.VITE_MOCK_AUTH === 'true' || !import.meta.env.VITE_API_URL);

function mockLoginResponse(payload: LoginPayload): LoginResponse {
  return {
    token: `mock-token-${payload.username}-${Date.now()}`,
    user: {
      id: 'mock-user-id',
      username: payload.username,
      displayName: payload.username,
      roles: ['user'],
      permissions: ['dashboard', 'hce', 'enfermeria', 'farmacia', 'admisiones', 'agendamiento', 'reportes'],
    },
  };
}

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  if (MOCK_AUTH) {
    await new Promise((r) => setTimeout(r, 400));
    return mockLoginResponse(payload);
  }
  const res = await httpClient<LoginResponse>(endpoints.auth.login, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res;
}

export async function getMeApi(): Promise<User> {
  if (MOCK_AUTH) {
    const token = getStoredToken();
    if (!token) throw new Error('No token');
    const username = token.replace(/^mock-token-/, '').replace(/-\d+$/, '');
    return {
      id: 'mock-user-id',
      username: username || 'demo',
      displayName: username || 'Usuario demo',
      roles: ['user'],
      permissions: ['dashboard', 'hce', 'enfermeria', 'farmacia', 'admisiones', 'agendamiento', 'reportes'],
    };
  }
  return httpClient<User>(endpoints.auth.me);
}

export async function logoutApi(): Promise<void> {
  try {
    await httpClient(endpoints.auth.logout, { method: 'POST' });
  } catch {
    // Ignorar error de red; el logout local se hace igual
  }
}
