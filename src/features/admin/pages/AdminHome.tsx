import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import UserManagement from '../components/UserManagement';
import RolesPermissions from '../components/RolesPermissions';
import SystemParameters from '../components/SystemParameters';
import AuditLog from '../components/AuditLog';
import MasterCatalogs from '../components/MasterCatalogs';
import { useAudit } from '../hooks/useAudit';
import {
  MOCK_ADMIN_USERS,
  MOCK_ROLES,
  MOCK_PERMISSIONS,
  MOCK_SYSTEM_PARAMETERS,
  MOCK_AUDIT_ENTRIES,
  MOCK_MASTER_CATALOGS,
} from '../data/mock';
import type { AdminUser, AuditEntry } from '../types';

export default function AdminHome() {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState(MOCK_ADMIN_USERS);
  const [parameters, setParameters] = useState(MOCK_SYSTEM_PARAMETERS);
  const [catalogs, setCatalogs] = useState(MOCK_MASTER_CATALOGS);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>(MOCK_AUDIT_ENTRIES);
  const addAuditEntry = useCallback((entry: AuditEntry) => {
    setAuditEntries((prev) => [entry, ...prev]);
  }, []);
  const { recordAudit } = useAudit(addAuditEntry);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity?: 'success' | 'error' | 'info';
  }>({ open: false, message: '' });

  function handleUserCreate(data: Omit<AdminUser, 'id' | 'createdAt' | 'lastLogin'>) {
    const newUser: AdminUser = {
      ...data,
      id: `u-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    recordAudit({
      action: 'CREATE',
      entity: 'usuario',
      entityId: newUser.id,
      details: `Usuario creado: ${newUser.username} - ${newUser.displayName}`,
    });
    setUsers((prev) => [newUser, ...prev]);
    setSnackbar({
      open: true,
      message: 'Usuario creado correctamente.',
      severity: 'success',
    });
  }

  function handleUserUpdate(userId: string, updates: Partial<AdminUser>) {
    const user = users.find((u) => u.id === userId);
    if (user) {
      const parts: string[] = [];
      if (updates.active !== undefined) parts.push(`Estado: ${updates.active ? 'Activo' : 'Inactivo'}`);
      if (updates.email) parts.push(`Email: ${updates.email}`);
      if (updates.displayName) parts.push(`Nombre: ${updates.displayName}`);
      if (updates.roles?.length) parts.push(`Roles: ${updates.roles.join(', ')}`);
      recordAudit({
        action: 'UPDATE',
        entity: 'usuario',
        entityId: userId,
        details: parts.length ? parts.join(' | ') : 'Usuario actualizado',
      });
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
    setSnackbar({
      open: true,
      message: 'Usuario actualizado correctamente.',
      severity: 'success',
    });
  }

  function handleUserDelete(userId: string) {
    const user = users.find((u) => u.id === userId);
    if (user) {
      recordAudit({
        action: 'DELETE',
        entity: 'usuario',
        entityId: userId,
        details: `Usuario eliminado: ${user.username} - ${user.displayName}`,
      });
    }
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setSnackbar({
      open: true,
      message: 'Usuario eliminado correctamente.',
      severity: 'success',
    });
  }

  function handleParameterUpdate(id: string, value: string, oldValue?: string) {
    const param = parameters.find((p) => p.id === id);
    if (param) {
      const details = oldValue !== undefined ? `${param.key}: ${oldValue} -> ${value}` : `${param.key} = ${value}`;
      recordAudit({
        action: 'UPDATE',
        entity: 'parametro',
        entityId: id,
        details,
      });
    }
    setParameters((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value } : p))
    );
    setSnackbar({
      open: true,
      message: 'Parámetro actualizado correctamente.',
      severity: 'success',
    });
  }

  function handleCatalogItemCreate(catalogId: string, code: string, name: string) {
    setCatalogs((prev) =>
      prev.map((c) => {
        if (c.id !== catalogId) return c;
        const newItem = {
          id: `catalog-item-${Date.now()}`,
          code: code.trim().toUpperCase(),
          name: name.trim(),
          active: true,
        };
        recordAudit({
          action: 'CREATE',
          entity: 'catalogo_item',
          entityId: newItem.id,
          details: `${c.name}: nuevo ítem ${newItem.code} - ${newItem.name}`,
        });
        return { ...c, items: [...c.items, newItem] };
      })
    );
    setSnackbar({
      open: true,
      message: 'Ítem agregado al catálogo correctamente.',
      severity: 'success',
    });
  }

  function handleCatalogItemUpdate(
    catalogId: string,
    itemId: string,
    updates: { code?: string; name?: string; active?: boolean }
  ) {
    setCatalogs((prev) =>
      prev.map((c) => {
        if (c.id !== catalogId) return c;
        const item = c.items.find((i) => i.id === itemId);
        if (!item) return c;
        const updated = { ...item, ...updates };
        recordAudit({
          action: 'UPDATE',
          entity: 'catalogo_item',
          entityId: itemId,
          details: `${c.name}: ${item.code} -> ${updated.code ?? item.code}`,
        });
        return {
          ...c,
          items: c.items.map((i) => (i.id === itemId ? updated : i)),
        };
      })
    );
    setSnackbar({
      open: true,
      message: 'Ítem actualizado correctamente.',
      severity: 'success',
    });
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Administración
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Configuración general del sistema. Gestión de usuarios, roles, permisos, parámetros, auditoría y catálogos maestros.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Gestión de usuarios" />
          <Tab label="Roles y permisos" />
          <Tab label="Parámetros del sistema" />
          <Tab label="Auditoría de acciones" />
          <Tab label="Catálogos maestros" />
        </Tabs>

        {tab === 0 && (
          <UserManagement
            users={users}
            roles={MOCK_ROLES}
            onUserCreate={handleUserCreate}
            onUserUpdate={handleUserUpdate}
            onUserDelete={handleUserDelete}
          />
        )}

        {tab === 1 && (
          <RolesPermissions
            roles={MOCK_ROLES}
            permissions={MOCK_PERMISSIONS}
          />
        )}

        {tab === 2 && (
          <SystemParameters
            parameters={parameters}
            onParameterUpdate={(id, value) => {
              const p = parameters.find((x) => x.id === id);
              handleParameterUpdate(id, value, p?.value);
            }}
          />
        )}

        {tab === 3 && <AuditLog entries={auditEntries} />}

        {tab === 4 && (
          <MasterCatalogs
            catalogs={catalogs}
            onItemCreate={handleCatalogItemCreate}
            onItemUpdate={handleCatalogItemUpdate}
          />
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity ?? 'info'}
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
