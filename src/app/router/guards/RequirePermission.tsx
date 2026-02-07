import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../core/auth/auth.store.tsx';
import { hasPermission } from '../../../core/auth/permissions';
import type { ReactNode } from 'react';

interface RequirePermissionProps {
  permission: string;
  children: ReactNode;
  fallbackTo?: string;
}

export default function RequirePermission({ permission, children, fallbackTo = '/dashboard' }: RequirePermissionProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(user, permission)) {
    return <Navigate to={fallbackTo} replace />;
  }

  return <>{children}</>;
}
