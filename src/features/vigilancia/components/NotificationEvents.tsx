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
import type { NotificationEvent } from '../types';

interface NotificationEventsProps {
  events: NotificationEvent[];
}

const STATUS_LABELS: Record<string, string> = {
  notificado: 'Notificado',
  confirmado: 'Confirmado',
  descartado: 'Descartado',
  en_seguimiento: 'En seguimiento',
};

const STATUS_COLORS: Record<string, 'info' | 'success' | 'default' | 'warning'> = {
  notificado: 'info',
  confirmado: 'success',
  descartado: 'default',
  en_seguimiento: 'warning',
};

export default function NotificationEvents({ events }: NotificationEventsProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filtered = events.filter((e) => {
    const matchSearch =
      !search ||
      e.code.toLowerCase().includes(search.toLowerCase()) ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      e.sivigilaId?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Eventos de notificación obligatoria según normativa vigente.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Código, evento, paciente o SIVIGILA"
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
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((s) => (
            <Chip
              key={s}
              label={STATUS_LABELS[s]}
              size="small"
              color={statusFilter === s ? 'primary' : 'default'}
              variant={statusFilter === s ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter(s)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Evento</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>ID SIVIGILA</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.code}</TableCell>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.type}</TableCell>
              <TableCell>{formatDate(e.date)}</TableCell>
              <TableCell>{e.patientName ?? '—'}</TableCell>
              <TableCell>{e.sivigilaId ?? '—'}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[e.status] ?? e.status}
                  size="small"
                  color={STATUS_COLORS[e.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay eventos de notificación.
        </Typography>
      )}
    </Box>
  );
}
