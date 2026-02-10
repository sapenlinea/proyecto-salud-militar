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
import type { GlosaAuditoria } from '../types';

interface GlosasAuditoriaProps {
  glosas: GlosaAuditoria[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

const TYPE_LABELS: Record<string, string> = {
  técnica: 'Técnica',
  administrativa: 'Administrativa',
  facturación: 'Facturación',
};

const ORIGIN_LABELS: Record<string, string> = {
  eps: 'EPS',
  interno: 'Interno',
};

const STATUS_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  en_gestion: 'En gestión',
  aceptada: 'Aceptada',
  rechazada: 'Rechazada',
};

const STATUS_COLORS: Record<string, 'warning' | 'info' | 'success' | 'error'> = {
  pendiente: 'warning',
  en_gestion: 'info',
  aceptada: 'success',
  rechazada: 'error',
};

export default function GlosasAuditoriaSection({ glosas }: GlosasAuditoriaProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [originFilter, setOriginFilter] = useState<string>('todos');

  const filtered = glosas.filter((g) => {
    const matchStatus = statusFilter === 'todos' || g.status === statusFilter;
    const matchOrigin = originFilter === 'todos' || g.origin === originFilter;
    return matchStatus && matchOrigin;
  });

  const totalGlosas = filtered.reduce((sum, g) => sum + g.amount, 0);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Glosas. Disputas por facturación EPS e internas.
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
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {STATUS_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Origen"
          value={originFilter}
          onChange={(e) => setOriginFilter(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(ORIGIN_LABELS) as Array<keyof typeof ORIGIN_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {ORIGIN_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Factura</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Origen</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Resolución</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((g) => (
            <TableRow key={g.id}>
              <TableCell>{g.invoiceNumber}</TableCell>
              <TableCell>
                <Typography variant="body2">{g.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {g.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{TYPE_LABELS[g.glosaType] ?? g.glosaType}</TableCell>
              <TableCell>{ORIGIN_LABELS[g.origin] ?? g.origin}</TableCell>
              <TableCell align="right">{formatCurrency(g.amount)}</TableCell>
              <TableCell>{g.date}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[g.status] ?? g.status}
                  size="small"
                  color={STATUS_COLORS[g.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 200 }}>{g.resolution ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="subtitle2">
            Total glosas: {formatCurrency(totalGlosas)}
          </Typography>
        </Box>
      )}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay glosas registradas.
        </Typography>
      )}
    </Box>
  );
}
