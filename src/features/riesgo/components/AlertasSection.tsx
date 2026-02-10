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
import type { AlertaRiesgo } from '../types';

interface AlertasSectionProps {
  alertas: AlertaRiesgo[];
}

const TYPE_LABELS: Record<string, string> = {
  clínica: 'Clínica',
  biopsicosocial: 'Biopicosocial',
  farmacológica: 'Farmacológica',
  hospitalización: 'Hospitalización',
};

const SEVERITY_LABELS: Record<string, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
  crítica: 'Crítica',
};

const SEVERITY_COLORS: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
  baja: 'success',
  media: 'info',
  alta: 'warning',
  crítica: 'error',
};

const STATUS_LABELS: Record<string, string> = {
  activa: 'Activa',
  en_seguimiento: 'En seguimiento',
  resuelta: 'Resuelta',
};

const STATUS_COLORS: Record<string, 'error' | 'info' | 'success'> = {
  activa: 'error',
  en_seguimiento: 'info',
  resuelta: 'success',
};

export default function AlertasSection({ alertas }: AlertasSectionProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [severityFilter, setSeverityFilter] = useState<string>('todos');

  const filtered = alertas.filter((a) => {
    const matchStatus = statusFilter === 'todos' || a.status === statusFilter;
    const matchSeverity = severityFilter === 'todos' || a.severity === severityFilter;
    return matchStatus && matchSeverity;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Alertas de riesgo por paciente. Clínicas, farmacológicas, biopsicosociales.
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
          label="Severidad"
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {(Object.keys(SEVERITY_LABELS) as Array<keyof typeof SEVERITY_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {SEVERITY_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Severidad</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Asignado</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((a) => (
            <TableRow key={a.id}>
              <TableCell>
                <Typography variant="body2">{a.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {a.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{TYPE_LABELS[a.type] ?? a.type}</TableCell>
              <TableCell>
                <Chip
                  label={SEVERITY_LABELS[a.severity] ?? a.severity}
                  size="small"
                  color={SEVERITY_COLORS[a.severity] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 260 }}>{a.description}</TableCell>
              <TableCell>{a.date}</TableCell>
              <TableCell>{a.assignedTo ?? '—'}</TableCell>
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
          No hay alertas registradas.
        </Typography>
      )}
    </Box>
  );
}
