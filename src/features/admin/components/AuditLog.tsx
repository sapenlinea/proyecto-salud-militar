import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { AuditEntry } from '../types';

interface AuditLogProps {
  entries: AuditEntry[];
}

const ACTION_LABELS: Record<string, string> = {
  LOGIN: 'Inicio de sesión',
  LOGOUT: 'Cierre de sesión',
  CREATE: 'Creación',
  UPDATE: 'Actualización',
  DELETE: 'Eliminación',
};

const ACTION_COLORS: Record<string, 'success' | 'info' | 'warning' | 'error' | 'default'> = {
  LOGIN: 'info',
  LOGOUT: 'default',
  CREATE: 'success',
  UPDATE: 'warning',
  DELETE: 'error',
};

export default function AuditLog({ entries }: AuditLogProps) {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('todos');

  const actions = ['todos', ...Array.from(new Set(entries.map((e) => e.action)))];
  const filtered = entries.filter((e) => {
    const matchSearch =
      !search ||
      e.userName.toLowerCase().includes(search.toLowerCase()) ||
      e.entity.toLowerCase().includes(search.toLowerCase()) ||
      (e.details && e.details.toLowerCase().includes(search.toLowerCase()));
    const matchAction = actionFilter === 'todos' || e.action === actionFilter;
    return matchSearch && matchAction;
  });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'medium' });

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Usuario, entidad o detalle"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
        />
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {actions.map((act) => (
            <Chip
              key={act}
              label={act === 'todos' ? 'Todos' : ACTION_LABELS[act] ?? act}
              size="small"
              color={actionFilter === act ? 'primary' : 'default'}
              variant={actionFilter === act ? 'filled' : 'outlined'}
              onClick={() => setActionFilter(act)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha y hora</TableCell>
            <TableCell>Acción</TableCell>
            <TableCell>Entidad</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Detalle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{formatDate(e.timestamp)}</TableCell>
              <TableCell>
                <Chip
                  label={ACTION_LABELS[e.action] ?? e.action}
                  size="small"
                  color={ACTION_COLORS[e.action] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                {e.entity}
                {e.entityId && (
                  <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                    ({e.entityId})
                  </Typography>
                )}
              </TableCell>
              <TableCell>{e.userName}</TableCell>
              <TableCell sx={{ maxWidth: 280 }}>{e.details ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No se encontraron registros de auditoría.
        </Typography>
      )}
    </Box>
  );
}
