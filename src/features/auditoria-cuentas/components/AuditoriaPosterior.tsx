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
import type { AuditoriaPosterior } from '../types';

interface AuditoriaPosteriorProps {
  auditorias: AuditoriaPosterior[];
}

const STATUS_LABELS: Record<string, string> = {
  en_proceso: 'En proceso',
  completada: 'Completada',
  pendiente: 'Pendiente',
};

const STATUS_COLORS: Record<string, 'warning' | 'success' | 'default'> = {
  en_proceso: 'warning',
  completada: 'success',
  pendiente: 'default',
};

export default function AuditoriaPosteriorSection({ auditorias }: AuditoriaPosteriorProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [periodFilter, setPeriodFilter] = useState('');
  const [search, setSearch] = useState('');

  const periods = [...new Set(auditorias.map((a) => a.period))];

  const filtered = auditorias.filter((a) => {
    const matchStatus = statusFilter === 'todos' || a.status === statusFilter;
    const matchPeriod = !periodFilter || a.period === periodFilter;
    const matchSearch =
      !search ||
      a.invoiceNumber.includes(search) ||
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.patientDocument.includes(search);
    return matchStatus && matchPeriod && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Auditoría posterior. Validación de facturación emitida.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Factura o paciente"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          size="small"
          label="Período"
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {periods.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
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
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Factura</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Período</TableCell>
            <TableCell>Fecha auditoría</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Aprobados</TableCell>
            <TableCell align="right">Observados</TableCell>
            <TableCell align="right">Rechazados</TableCell>
            <TableCell>Auditor</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.invoiceNumber}</TableCell>
              <TableCell>
                <Typography variant="body2">{a.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {a.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{a.period}</TableCell>
              <TableCell>{a.auditDate || '—'}</TableCell>
              <TableCell align="right">{a.totalItems}</TableCell>
              <TableCell align="right">{a.approvedItems}</TableCell>
              <TableCell align="right">{a.observedItems}</TableCell>
              <TableCell align="right">{a.rejectedItems}</TableCell>
              <TableCell>{a.auditor || '—'}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[a.status] ?? a.status}
                  size="small"
                  color={STATUS_COLORS[a.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay auditorías posteriores.
        </Typography>
      )}
    </Box>
  );
}
