import ErrorBoundary from './ErrorBoundary';
import QueryProvider from './providers/QueryProvider';
import Router from './router/index';
import ThemeProvider from './providers/ThemeProvider';
import { AuthProvider } from '../core/auth/auth.store.tsx';

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AuthProvider>
          <QueryProvider>
            <Router />
          </QueryProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
