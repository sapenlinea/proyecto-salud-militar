import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../../core/auth/auth.store.tsx';
import { AppRoutes } from './routes';

export default function Router() {
  const { initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
