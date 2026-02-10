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
import type { Glosa } from '../types';

interface GlosasSectionProps {
  glosas: Glosa[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

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

const TIPO_LABELS: Record<string, string> = {
  técnica: 'Técnica',
  administrativa: 'Administrativa',
  facturación: 'Facturación',
};

export default function GlosasSection({ glosas }: GlosasSectionProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [typeFilter, setTypeFilter] = useState<string>('todos');

  const filtered = glosas.filter((g) => {
    const matchStatus = statusFilter === 'todos' || g.status === statusFilter;
    const matchType = typeFilter === 'todos' || g.glosaType === typeFilter;
    return matchStatus && matchType;
  });

  const totalGlosas = filtered.reduce((sum, g) => sum + g.amount, 0);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión de glosas. Disputas por facturación con EPS.
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
          label="Tipo"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(TIPO_LABELS) as Array<keyof typeof TIPO_LABELS>).map((t) => (
            <MenuItem key={t} value={t}>
              {TIPO_LABELS[t]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Factura</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>EPS</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estado</TableCell>
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
              <TableCell>{g.eps}</TableCell>
              <TableCell>{TIPO_LABELS[g.glosaType] ?? g.glosaType}</TableCell>
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
