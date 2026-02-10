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
import type { ActiveCase } from '../types';

interface ActiveCasesProps {
  cases: ActiveCase[];
}

const STATUS_LABELS: Record<string, string> = {
  activo: 'Activo',
  recuperado: 'Recuperado',
  fallecido: 'Fallecido',
};

const STATUS_COLORS: Record<string, 'warning' | 'success' | 'error'> = {
  activo: 'warning',
  recuperado: 'success',
  fallecido: 'error',
};

export default function ActiveCases({ cases }: ActiveCasesProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filtered = cases.filter((c) => {
    const matchSearch =
      !search ||
      c.eventCode.toLowerCase().includes(search.toLowerCase()) ||
      c.eventName.toLowerCase().includes(search.toLowerCase()) ||
      c.patientName.toLowerCase().includes(search.toLowerCase()) ||
      c.patientDocument.includes(search);
    const matchStatus = statusFilter === 'todos' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Casos activos en vigilancia epidemiológica. Pacientes en seguimiento.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Evento, paciente o documento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
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
            <TableCell>Documento</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Fecha notificación</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Responsable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.eventCode}</TableCell>
              <TableCell>{c.eventName}</TableCell>
              <TableCell>{c.patientDocument}</TableCell>
              <TableCell>{c.patientName}</TableCell>
              <TableCell>{formatDate(c.notificationDate)}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[c.status] ?? c.status}
                  size="small"
                  color={STATUS_COLORS[c.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{c.responsible}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay casos activos.
        </Typography>
      )}
    </Box>
  );
}
