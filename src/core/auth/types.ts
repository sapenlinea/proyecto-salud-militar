export interface User {
  id: string;
  username: string;
  email?: string;
  displayName?: string;
  roles: string[];
  permissions: string[];
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}
