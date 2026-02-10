import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { License } from '../types';

interface LicensesProps {
  licenses: License[];
}

const STATUS_LABELS: Record<string, string> = {
  vigente: 'Vigente',
  próximo_vencer: 'Próximo a vencer',
  vencido: 'Vencido',
};

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'error'> = {
  vigente: 'success',
  próximo_vencer: 'warning',
  vencido: 'error',
};

export default function Licenses({ licenses }: LicensesProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filtered =
    statusFilter === 'todos'
      ? licenses
      : licenses.filter((l) => l.status === statusFilter);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Habilitaciones y títulos del personal (tarjetas profesionales, registros, etc.).
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
        {(['vigente', 'próximo_vencer', 'vencido'] as const).map((s) => (
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
            <TableCell>Personal</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Número</TableCell>
            <TableCell>Entidad emisora</TableCell>
            <TableCell>Vigencia hasta</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((l) => (
            <TableRow key={l.id}>
              <TableCell>{l.staffName}</TableCell>
              <TableCell>{l.type}</TableCell>
              <TableCell>{l.number}</TableCell>
              <TableCell>{l.issuingEntity}</TableCell>
              <TableCell>{formatDate(l.expiryDate)}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[l.status] ?? l.status}
                  size="small"
                  color={STATUS_COLORS[l.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay habilitaciones con ese filtro.
        </Typography>
      )}
    </Box>
  );
}
