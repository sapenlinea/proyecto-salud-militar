import { useState } from 'react';
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
import type { Facturacion } from '../types';

interface FacturacionSectionProps {
  facturas: Facturacion[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

const STATUS_LABELS: Record<string, string> = {
  borrador: 'Borrador',
  enviada: 'Enviada',
  pagada: 'Pagada',
  cartera: 'Cartera',
};

const STATUS_COLORS: Record<string, 'default' | 'info' | 'success' | 'warning'> = {
  borrador: 'default',
  enviada: 'info',
  pagada: 'success',
  cartera: 'warning',
};

export default function FacturacionSection({ facturas }: FacturacionSectionProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [epsFilter, setEpsFilter] = useState<string>('todos');

  const epsList = [...new Set(facturas.map((f) => f.eps))];

  const filtered = facturas.filter((f) => {
    const matchStatus = statusFilter === 'todos' || f.status === statusFilter;
    const matchEps = epsFilter === 'todos' || f.eps === epsFilter;
    return matchStatus && matchEps;
  });

  const totalFacturado = filtered.reduce((sum, f) => sum + f.total, 0);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Facturación de servicios. Facturas enviadas, pagadas y en cartera.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          select
          size="small"
          label="Estado"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((s) => (
            <MenuItem key={s} value={s}>
              {STATUS_LABELS[s]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="EPS"
          value={epsFilter}
          onChange={(e) => setEpsFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {epsList.map((eps) => (
            <MenuItem key={eps} value={eps}>
              {eps}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nº Factura</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>EPS</TableCell>
            <TableCell>Período</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">IVA</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell>Emisión</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.invoiceNumber}</TableCell>
              <TableCell>
                <Typography variant="body2">{f.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {f.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{f.eps}</TableCell>
              <TableCell>{f.period}</TableCell>
              <TableCell align="right">{formatCurrency(f.subtotal)}</TableCell>
              <TableCell align="right">{formatCurrency(f.iva)}</TableCell>
              <TableCell align="right">{formatCurrency(f.total)}</TableCell>
              <TableCell>{f.emissionDate}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[f.status] ?? f.status}
                  size="small"
                  color={STATUS_COLORS[f.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="subtitle2">
            Total facturado: {formatCurrency(totalFacturado)}
          </Typography>
        </Box>
      )}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay facturas.
        </Typography>
      )}
    </Box>
  );
}
