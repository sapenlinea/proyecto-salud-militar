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
import type { SolicitudImagen } from '../types';

interface ImagenesDiagnosticasProps {
  solicitudes: SolicitudImagen[];
}

const MODALITY_LABELS: Record<string, string> = {
  rx: 'Radiografía',
  ecografia: 'Ecografía',
  tomografia: 'Tomografía',
  resonancia: 'Resonancia',
  otro: 'Otro',
};

const STATUS_LABELS: Record<string, string> = {
  solicitado: 'Solicitado',
  agendado: 'Agendado',
  realizado: 'Realizado',
  informado: 'Informado',
  validado: 'Validado',
  entregado: 'Entregado',
};

const STATUS_COLORS: Record<string, 'default' | 'info' | 'warning' | 'success'> = {
  solicitado: 'default',
  agendado: 'info',
  realizado: 'warning',
  informado: 'warning',
  validado: 'success',
  entregado: 'success',
};

export default function ImagenesDiagnosticas({ solicitudes }: ImagenesDiagnosticasProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [modalityFilter, setModalityFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = solicitudes.filter((s) => {
    const matchStatus = statusFilter === 'todos' || s.status === statusFilter;
    const matchModality = modalityFilter === 'todos' || s.modality === modalityFilter;
    const matchSearch =
      !search ||
      s.patientName.toLowerCase().includes(search.toLowerCase()) ||
      s.patientDocument.includes(search) ||
      s.studyName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchModality && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Solicitudes de imágenes diagnósticas. RX, ecografía, TAC, resonancia.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente o estudio"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          size="small"
          label="Modalidad"
          value={modalityFilter}
          onChange={(e) => setModalityFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {(Object.keys(MODALITY_LABELS) as Array<keyof typeof MODALITY_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {MODALITY_LABELS[k]}
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
            <TableCell>Fecha solicitud</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Estudio</TableCell>
            <TableCell>Modalidad</TableCell>
            <TableCell>Cita</TableCell>
            <TableCell>Solicitó</TableCell>
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
              <TableCell>{s.studyName}</TableCell>
              <TableCell>{MODALITY_LABELS[s.modality] ?? s.modality}</TableCell>
              <TableCell>{s.appointmentDate ?? '—'}</TableCell>
              <TableCell>{s.orderedBy}</TableCell>
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
          No hay solicitudes de imágenes.
        </Typography>
      )}
    </Box>
  );
}
