import { useCallback } from 'react';
import { useAuth } from '../../../core/auth/auth.store';
import type { AuditEntry } from '../types';

export type AuditAction = 'LOGIN' | 'LOGOUT' | 'CREATE' | 'UPDATE' | 'DELETE';

export interface AddAuditEntryParams {
  action: AuditAction;
  entity: string;
  entityId?: string;
  details?: string;
}

function generateId(): string {
  return `a-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useAudit(addEntry: (entry: AuditEntry) => void) {
  const { user } = useAuth();

  const recordAudit = useCallback(
    (params: AddAuditEntryParams) => {
      if (!user) return;
      const entry: AuditEntry = {
        id: generateId(),
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        userId: user.id,
        userName: user.displayName ?? user.username,
        timestamp: new Date().toISOString(),
        details: params.details,
      };
      addEntry(entry);
    },
    [user, addEntry]
  );

  return { recordAudit };
}
