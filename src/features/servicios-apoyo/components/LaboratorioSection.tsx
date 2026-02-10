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
import type { SolicitudLaboratorio } from '../types';

interface LaboratorioSectionProps {
  solicitudes: SolicitudLaboratorio[];
}

const STATUS_LABELS: Record<string, string> = {
  solicitado: 'Solicitado',
  en_proceso: 'En proceso',
  resultado_listo: 'Resultado listo',
  validado: 'Validado',
  entregado: 'Entregado',
};

const STATUS_COLORS: Record<string, 'default' | 'info' | 'warning' | 'success'> = {
  solicitado: 'default',
  en_proceso: 'info',
  resultado_listo: 'warning',
  validado: 'success',
  entregado: 'success',
};

const PRIORITY_LABELS: Record<string, string> = {
  rutina: 'Rutina',
  urgente: 'Urgente',
  estat: 'Estadía',
};

export default function LaboratorioSection({ solicitudes }: LaboratorioSectionProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = solicitudes.filter((s) => {
    const matchStatus = statusFilter === 'todos' || s.status === statusFilter;
    const matchSearch =
      !search ||
      s.patientName.toLowerCase().includes(search.toLowerCase()) ||
      s.patientDocument.includes(search) ||
      s.studyName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Solicitudes de laboratorio clínico. Estado y prioridad.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente, documento o estudio"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
        />
        <TextField
          select
          size="small"
          label="Estado"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 150 }}
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
            <TableCell>Fecha solicitud</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Estudio</TableCell>
            <TableCell>Solicitó</TableCell>
            <TableCell>Prioridad</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.orderDate}</TableCell>
              <TableCell>
                <Typography variant="body2">{s.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {s.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{s.studyCode}</TableCell>
              <TableCell>{s.studyName}</TableCell>
              <TableCell>{s.orderedBy}</TableCell>
              <TableCell>
                {s.priority ? (
                  <Chip label={PRIORITY_LABELS[s.priority] ?? s.priority} size="small" variant="outlined" />
                ) : (
                  '—'
                )}
              </TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[s.status] ?? s.status}
                  size="small"
                  color={STATUS_COLORS[s.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay solicitudes de laboratorio.
        </Typography>
      )}
    </Box>
  );
}
