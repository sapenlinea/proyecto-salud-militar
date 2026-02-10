import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Contract } from '../types';

interface ContractsProps {
  contracts: Contract[];
}

const CONTRACT_TYPE_LABELS: Record<string, string> = {
  indefinido: 'Indefinido',
  término_fijo: 'Término fijo',
  prestación_servicios: 'Prestación de servicios',
};

const STATUS_LABELS: Record<string, string> = {
  vigente: 'Vigente',
  vencido: 'Vencido',
  terminado: 'Terminado',
};

const STATUS_COLORS: Record<string, 'success' | 'error' | 'default'> = {
  vigente: 'success',
  vencido: 'error',
  terminado: 'default',
};

export default function Contracts({ contracts }: ContractsProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filtered =
    statusFilter === 'todos'
      ? contracts
      : contracts.filter((c) => c.status === statusFilter);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  const formatCurrency = (n?: number) =>
    n != null ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(n) : '—';

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
        <Chip
          label="Todos"
          size="small"
          color={statusFilter === 'todos' ? 'primary' : 'default'}
          variant={statusFilter === 'todos' ? 'filled' : 'outlined'}
          onClick={() => setStatusFilter('todos')}
          sx={{ cursor: 'pointer' }}
        />
        {(['vigente', 'vencido', 'terminado'] as const).map((s) => (
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
            <TableCell>Inicio</TableCell>
            <TableCell>Fin</TableCell>
            <TableCell>Salario</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.staffName}</TableCell>
              <TableCell>{CONTRACT_TYPE_LABELS[c.type] ?? c.type}</TableCell>
              <TableCell>{formatDate(c.startDate)}</TableCell>
              <TableCell>{c.endDate ? formatDate(c.endDate) : '—'}</TableCell>
              <TableCell>{formatCurrency(c.salary)}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[c.status] ?? c.status}
                  size="small"
                  color={STATUS_COLORS[c.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay contratos con ese filtro.
        </Typography>
      )}
    </Box>
  );
}
