import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { EarlyAlert } from '../types';

interface EarlyAlertsProps {
  alerts: EarlyAlert[];
}

const SEVERITY_LABELS: Record<string, string> = {
  info: 'Info',
  warning: 'Advertencia',
  critical: 'Crítico',
};

const SEVERITY_COLORS: Record<string, 'info' | 'warning' | 'error'> = {
  info: 'info',
  warning: 'warning',
  critical: 'error',
};

const STATUS_LABELS: Record<string, string> = {
  activa: 'Activa',
  en_seguimiento: 'En seguimiento',
  cerrada: 'Cerrada',
};

export default function EarlyAlerts({ alerts }: EarlyAlertsProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filtered =
    statusFilter === 'todos'
      ? alerts
      : alerts.filter((a) => a.status === statusFilter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime()
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Alertas tempranas detectadas por el sistema de vigilancia epidemiológica.
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha detección</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Zona</TableCell>
            <TableCell>Severidad</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{formatDate(a.detectedAt)}</TableCell>
              <TableCell>{a.type}</TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {a.title}
                </Typography>
              </TableCell>
              <TableCell sx={{ maxWidth: 280 }}>{a.description}</TableCell>
              <TableCell>{a.zone ?? '—'}</TableCell>
              <TableCell>
                <Chip
                  label={SEVERITY_LABELS[a.severity] ?? a.severity}
                  size="small"
                  color={SEVERITY_COLORS[a.severity] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{STATUS_LABELS[a.status] ?? a.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay alertas tempranas.
        </Typography>
      )}
    </Box>
  );
}
