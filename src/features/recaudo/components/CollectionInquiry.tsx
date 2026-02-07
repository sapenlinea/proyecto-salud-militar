import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Payment, PaymentStatus } from '../types.js';

interface CollectionInquiryProps {
  payments: Payment[];
}

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  efectivo: 'Efectivo',
  transferencia: 'Transferencia',
  tarjeta_debito: 'Tarjeta débito',
  tarjeta_credito: 'Tarjeta crédito',
  cheque: 'Cheque',
};

const STATUS_LABELS: Record<PaymentStatus, string> = {
  registrado: 'Registrado',
  conciliado: 'Conciliado',
  rechazado: 'Rechazado',
  anulado: 'Anulado',
};

const STATUS_COLORS: Record<PaymentStatus, 'success' | 'error' | 'warning' | 'default'> = {
  registrado: 'warning',
  conciliado: 'success',
  rechazado: 'error',
  anulado: 'error',
};

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency }).format(amount);
}

export default function CollectionInquiry({ payments }: CollectionInquiryProps) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'todos'>('todos');
  const [methodFilter, setMethodFilter] = useState<string>('todos');

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchDateFrom = !dateFrom || p.paymentDate >= dateFrom;
      const matchDateTo = !dateTo || p.paymentDate <= dateTo;
      const matchStatus = statusFilter === 'todos' || p.status === statusFilter;
      const matchMethod = methodFilter === 'todos' || p.paymentMethod === methodFilter;
      return matchDateFrom && matchDateTo && matchStatus && matchMethod;
    });
  }, [payments, dateFrom, dateTo, statusFilter, methodFilter]);

  const total = useMemo(() => filtered.reduce((sum, p) => sum + p.amount, 0), [filtered]);

  const methods = useMemo(() => Array.from(new Set(payments.map((p) => p.paymentMethod))), [payments]);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField size="small" label="Desde" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ minWidth: 140 }} />
        <TextField size="small" label="Hasta" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ minWidth: 140 }} />
        <TextField select size="small" label="Forma de pago" value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="todos">Todas</MenuItem>
          {methods.map((m) => (
            <MenuItem key={m} value={m}>{PAYMENT_METHOD_LABELS[m] ?? m}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip label="Todos" size="small" color={statusFilter === 'todos' ? 'primary' : 'default'} variant={statusFilter === 'todos' ? 'filled' : 'outlined'} onClick={() => setStatusFilter('todos')} sx={{ cursor: 'pointer' }} />
          {(Object.keys(STATUS_LABELS) as PaymentStatus[]).map((s) => (
            <Chip key={s} label={STATUS_LABELS[s]} size="small" color={statusFilter === s ? 'primary' : 'default'} variant={statusFilter === s ? 'filled' : 'outlined'} onClick={() => setStatusFilter(s)} sx={{ cursor: 'pointer' }} />
          ))}
        </Box>
        <Typography variant="subtitle2" sx={{ ml: 2 }}>
          Total: {formatCurrency(total, 'COP')} ({filtered.length} pagos)
        </Typography>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Afiliado</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Concepto</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell>Forma de pago</TableCell>
            <TableCell>Referencia</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.paymentDate}</TableCell>
              <TableCell>{p.affiliateName}</TableCell>
              <TableCell>{p.document}</TableCell>
              <TableCell>{p.concept}</TableCell>
              <TableCell align="right">{formatCurrency(p.amount, p.currency)}</TableCell>
              <TableCell>{PAYMENT_METHOD_LABELS[p.paymentMethod] ?? p.paymentMethod}</TableCell>
              <TableCell>{p.reference ?? '—'}</TableCell>
              <TableCell>
                <Chip label={STATUS_LABELS[p.status]} size="small" color={STATUS_COLORS[p.status]} variant="outlined" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay pagos que coincidan con los filtros.
        </Typography>
      )}
    </Box>
  );
}
