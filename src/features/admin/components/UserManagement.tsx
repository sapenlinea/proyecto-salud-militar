import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import UserFormDialog from './UserFormDialog';
import { validateUser, type UserFormData } from '../utils/userValidation';
import type { AdminUser } from '../types';

interface UserManagementProps {
  users: AdminUser[];
  roles: { id: string; name: string }[];
  onUserCreate?: (data: Omit<AdminUser, 'id' | 'createdAt' | 'lastLogin'>) => void;
  onUserUpdate?: (userId: string, updates: Partial<AdminUser>) => void;
  onUserDelete?: (userId: string) => void;
}

export default function UserManagement({
  users,
  roles,
  onUserCreate,
  onUserUpdate,
  onUserDelete,
}: UserManagementProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'activos' | 'inactivos'>('todos');
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<AdminUser | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === 'todos' ||
      (statusFilter === 'activos' && u.active) ||
      (statusFilter === 'inactivos' && !u.active);
    return matchSearch && matchStatus;
  });

  function handleToggleActive(user: AdminUser) {
    onUserUpdate?.(user.id, { active: !user.active });
  }

  function handleOpenCreate() {
    setFormMode('create');
    setEditingUser(null);
    setValidationError(null);
    setFormOpen(true);
  }

  function handleOpenEdit(user: AdminUser) {
    setFormMode('edit');
    setEditingUser(user);
    setValidationError(null);
    setFormOpen(true);
  }

  function handleFormSubmit(data: {
    username: string;
    email: string;
    displayName: string;
    roles: string[];
    active?: boolean;
  }) {
    setValidationError(null);
    const formData: UserFormData = {
      username: data.username,
      email: data.email,
      displayName: data.displayName,
      roles: data.roles,
    };
    const existingUsernames = users.map((u) => u.username);
    const result = validateUser(
      formData,
      existingUsernames,
      formMode === 'edit' ? editingUser?.username : undefined
    );
    if (!result.valid) {
      setValidationError(result.error ?? 'Error de validación.');
      return;
    }
    if (formMode === 'create') {
      onUserCreate?.({
        username: formData.username,
        email: formData.email,
        displayName: formData.displayName,
        roles: formData.roles,
        active: true,
      });
      setFormOpen(false);
    } else if (editingUser) {
      onUserUpdate?.(editingUser.id, {
        email: formData.email,
        displayName: formData.displayName,
        roles: formData.roles,
        ...(data.active !== undefined && { active: data.active }),
      });
      setFormOpen(false);
    }
  }

  function handleDeleteClick(user: AdminUser) {
    setDeleteConfirm(user);
  }

  function handleDeleteConfirm() {
    if (deleteConfirm) {
      onUserDelete?.(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  }

  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }) : '—';

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            label="Buscar usuario"
            placeholder="Usuario, nombre o email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 260 }}
          />
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            <Chip
              label="Todos"
              size="small"
              color={statusFilter === 'todos' ? 'primary' : 'default'}
              variant={statusFilter === 'todos' ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter('todos')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Activos"
              size="small"
              color={statusFilter === 'activos' ? 'primary' : 'default'}
              variant={statusFilter === 'activos' ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter('activos')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Inactivos"
              size="small"
              color={statusFilter === 'inactivos' ? 'primary' : 'default'}
              variant={statusFilter === 'inactivos' ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter('inactivos')}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        </Box>
        <Button variant="contained" onClick={handleOpenCreate}>
          Nuevo usuario
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Roles</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Último acceso</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.displayName}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {u.roles.map((r) => (
                    <Chip key={r} label={r} size="small" variant="outlined" />
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={u.active ? 'Activo' : 'Inactivo'}
                  size="small"
                  color={u.active ? 'success' : 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{formatDate(u.lastLogin)}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  <Button size="small" onClick={() => handleOpenEdit(u)}>
                    Editar
                  </Button>
                  <Button size="small" onClick={() => handleToggleActive(u)}>
                    {u.active ? 'Desactivar' : 'Activar'}
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteClick(u)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No se encontraron usuarios.
        </Typography>
      )}

      <UserFormDialog
        open={formOpen}
        mode={formMode}
        user={editingUser ?? undefined}
        roles={roles}
        validationError={formOpen ? validationError : null}
        onClose={() => {
          setFormOpen(false);
          setValidationError(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <Dialog open={Boolean(deleteConfirm)} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de eliminar al usuario "{deleteConfirm?.displayName}" ({deleteConfirm?.username})?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
