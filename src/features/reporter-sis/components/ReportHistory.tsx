import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ReportSubmission } from '../types';

interface ReportHistoryProps {
  submissions: ReportSubmission[];
}

const STATUS_LABELS: Record<string, string> = {
  enviado: 'Enviado',
  recibido: 'Recibido',
  error: 'Error',
};

const STATUS_COLORS: Record<string, 'info' | 'success' | 'error'> = {
  enviado: 'info',
  recibido: 'success',
  error: 'error',
};

export default function ReportHistory({ submissions }: ReportHistoryProps) {
  const [entityFilter, setEntityFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const entities = Array.from(new Set(submissions.map((s) => s.entity)));
  const filtered = submissions.filter((s) => {
    const matchEntity = !entityFilter || s.entity === entityFilter;
    const matchStatus = statusFilter === 'todos' || s.status === statusFilter;
    const matchSearch =
      !search ||
      s.reportName.toLowerCase().includes(search.toLowerCase()) ||
      s.transactionId?.toLowerCase().includes(search.toLowerCase());
    return matchEntity && matchStatus && matchSearch;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Histórico de reportes enviados a entes externos. Transacciones y estados de recepción.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Reporte o ID transacción"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Ente</InputLabel>
          <Select
            label="Ente"
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {entities.map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            <TableCell>Fecha envío</TableCell>
            <TableCell>Reporte</TableCell>
            <TableCell>Ente</TableCell>
            <TableCell>ID transacción</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{formatDate(s.sentAt)}</TableCell>
              <TableCell>{s.reportName}</TableCell>
              <TableCell>{s.entity}</TableCell>
              <TableCell>{s.transactionId ?? '—'}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[s.status] ?? s.status}
                  size="small"
                  color={STATUS_COLORS[s.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay envíos en el histórico.
        </Typography>
      )}
    </Box>
  );
}
