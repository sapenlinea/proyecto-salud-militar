import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { DetalleContable } from '../types';

interface DetalleContableSectionProps {
  items: DetalleContable[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

export default function DetalleContableSection({ items }: DetalleContableSectionProps) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [accountFilter, setAccountFilter] = useState('');

  const filtered = items.filter((i) => {
    const matchDateFrom = !dateFrom || i.date >= dateFrom;
    const matchDateTo = !dateTo || i.date <= dateTo;
    const matchAccount =
      !accountFilter ||
      i.accountCode.includes(accountFilter) ||
      i.accountName.toLowerCase().includes(accountFilter.toLowerCase());
    return matchDateFrom && matchDateTo && matchAccount;
  });

  const totalDebit = filtered.reduce((sum, i) => sum + i.debit, 0);
  const totalCredit = filtered.reduce((sum, i) => sum + i.credit, 0);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Detalle contable. Movimientos por cuenta y período.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Fecha desde"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
        />
        <TextField
          size="small"
          label="Fecha hasta"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
        />
        <TextField
          size="small"
          label="Cuenta"
          placeholder="Código o nombre"
          value={accountFilter}
          onChange={(e) => setAccountFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        />
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Cuenta</TableCell>
            <TableCell>Ref.</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Débito</TableCell>
            <TableCell align="right">Crédito</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.date}</TableCell>
              <TableCell>{i.accountCode}</TableCell>
              <TableCell>{i.accountName}</TableCell>
              <TableCell>{i.documentRef}</TableCell>
              <TableCell>{i.description}</TableCell>
              <TableCell align="right">{i.debit > 0 ? formatCurrency(i.debit) : '—'}</TableCell>
              <TableCell align="right">{i.credit > 0 ? formatCurrency(i.credit) : '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
          <Typography variant="body2">
            Total débitos: {formatCurrency(totalDebit)}
          </Typography>
          <Typography variant="body2">
            Total créditos: {formatCurrency(totalCredit)}
          </Typography>
        </Box>
      )}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay movimientos contables.
        </Typography>
      )}
    </Box>
  );
}
