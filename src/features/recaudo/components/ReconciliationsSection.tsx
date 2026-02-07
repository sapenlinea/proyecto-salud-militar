import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Reconciliation, ReconciliationStatus } from '../types.js';

interface ReconciliationsSectionProps {
  reconciliations: Reconciliation[];
}

const STATUS_LABELS: Record<ReconciliationStatus, string> = {
  pendiente: 'Pendiente',
  conciliado: 'Conciliado',
  con_diferencias: 'Con diferencias',
};

const STATUS_COLORS: Record<ReconciliationStatus, 'success' | 'error' | 'warning' | 'default'> = {
  pendiente: 'warning',
  conciliado: 'success',
  con_diferencias: 'error',
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

export default function ReconciliationsSection({ reconciliations }: ReconciliationsSectionProps) {
  const [statusFilter, setStatusFilter] = useState<ReconciliationStatus | 'todos'>('todos');

  const filtered = useMemo(
    () => (statusFilter === 'todos' ? reconciliations : reconciliations.filter((r) => r.status === statusFilter)),
    [reconciliations, statusFilter]
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle2">Filtrar por estado:</Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip label="Todos" size="small" color={statusFilter === 'todos' ? 'primary' : 'default'} variant={statusFilter === 'todos' ? 'filled' : 'outlined'} onClick={() => setStatusFilter('todos')} sx={{ cursor: 'pointer' }} />
          {(Object.keys(STATUS_LABELS) as ReconciliationStatus[]).map((s) => (
            <Chip key={s} label={STATUS_LABELS[s]} size="small" color={statusFilter === s ? 'primary' : 'default'} variant={statusFilter === s ? 'filled' : 'outlined'} onClick={() => setStatusFilter(s)} sx={{ cursor: 'pointer' }} />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Período desde</TableCell>
            <TableCell>Período hasta</TableCell>
            <TableCell align="right">Esperado</TableCell>
            <TableCell align="right">Recibido</TableCell>
            <TableCell align="right">Diferencia</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Notas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.periodFrom}</TableCell>
              <TableCell>{r.periodTo}</TableCell>
              <TableCell align="right">{formatCurrency(r.expectedAmount)}</TableCell>
              <TableCell align="right">{formatCurrency(r.receivedAmount)}</TableCell>
              <TableCell align="right" sx={{ color: r.difference !== 0 ? 'error.main' : undefined }}>{formatCurrency(r.difference)}</TableCell>
              <TableCell>
                <Chip label={STATUS_LABELS[r.status]} size="small" color={STATUS_COLORS[r.status]} variant="outlined" />
              </TableCell>
              <TableCell>{r.notes ?? (r.reconciledAt ? `Conciliado: ${r.reconciledAt.slice(0, 10)}` : '—')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay conciliaciones que coincidan con el filtro.
        </Typography>
      )}
    </Box>
  );
}
