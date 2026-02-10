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
import type { ReporteRegulatorio } from '../types';

interface ReportesRegulatoriosProps {
  reportes: ReporteRegulatorio[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

const TYPE_LABELS: Record<string, string> = {
  mensual: 'Mensual',
  trimestral: 'Trimestral',
  anual: 'Anual',
};

const STATUS_LABELS: Record<string, string> = {
  borrador: 'Borrador',
  enviado: 'Enviado',
  validado: 'Validado',
};

const STATUS_COLORS: Record<string, 'default' | 'info' | 'success'> = {
  borrador: 'default',
  enviado: 'info',
  validado: 'success',
};

export default function ReportesRegulatorios({ reportes }: ReportesRegulatoriosProps) {
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filtered = reportes.filter((r) => {
    const matchType = typeFilter === 'todos' || r.reportType === typeFilter;
    const matchStatus = statusFilter === 'todos' || r.status === statusFilter;
    return matchType && matchStatus;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Reportes regulatorios CAC. Mensuales, trimestrales y anuales.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          select
          size="small"
          label="Tipo"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(TYPE_LABELS) as Array<keyof typeof TYPE_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {TYPE_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Estado"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {STATUS_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Período</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell align="right">Pacientes</TableCell>
            <TableCell align="right">Costo total</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha envío</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.period}</TableCell>
              <TableCell>{TYPE_LABELS[r.reportType] ?? r.reportType}</TableCell>
              <TableCell align="right">{r.patientCount}</TableCell>
              <TableCell align="right">{formatCurrency(r.totalCost)}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[r.status] ?? r.status}
                  size="small"
                  color={STATUS_COLORS[r.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{r.sentDate ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay reportes regulatorios.
        </Typography>
      )}
    </Box>
  );
}
