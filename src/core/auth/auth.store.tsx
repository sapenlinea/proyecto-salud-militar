import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { getStoredToken, removeStoredToken, setStoredToken } from './token.storage.js';
import { loginApi, getMeApi, logoutApi } from './auth.api.js';
import type { User } from './types.js';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getInitialToken(): string | null {
  if (typeof sessionStorage === 'undefined') return null;
  return getStoredToken();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getInitialToken);
  const [isInitialized, setIsInitialized] = useState(() => !getInitialToken());

  const initialize = useCallback(async () => {
    const stored = getStoredToken();
    if (!stored) {
      setToken(null);
      setUser(null);
      setIsInitialized(true);
      return;
    }
    try {
      const me = await getMeApi();
      setToken(stored);
      setUser(me);
    } catch {
      removeStoredToken();
      setToken(null);
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const { token: newToken, user: userData } = await loginApi({ username, password });
    setStoredToken(newToken);
    setToken(newToken);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await logoutApi();
    removeStoredToken();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isInitialized,
      login,
      logout,
      initialize,
    }),
    [user, token, isInitialized, login, logout, initialize]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
