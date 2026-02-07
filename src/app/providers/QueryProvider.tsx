import type { ReactNode } from 'react';

function QueryProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default QueryProvider;
