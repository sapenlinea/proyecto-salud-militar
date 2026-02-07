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
import type { Bed } from '../types.js';

interface AvailableBedsProps {
  beds: Bed[];
}

const STATUS_LABELS: Record<Bed['status'], string> = {
  disponible: 'Disponible',
  ocupada: 'Ocupada',
  mantenimiento: 'Mantenimiento',
  reservada: 'Reservada',
};

const STATUS_COLORS: Record<Bed['status'], 'success' | 'error' | 'warning' | 'default'> = {
  disponible: 'success',
  ocupada: 'error',
  mantenimiento: 'warning',
  reservada: 'default',
};

export default function AvailableBeds({ beds }: AvailableBedsProps) {
  const [unitFilter, setUnitFilter] = useState<string>('todas');
  const [statusFilter, setStatusFilter] = useState<Bed['status'] | 'todos'>('todos');

  const units = Array.from(new Set(beds.map((b) => b.unit))).sort();

  const filtered = beds.filter((b) => {
    const matchUnit = unitFilter === 'todas' || b.unit === unitFilter;
    const matchStatus = statusFilter === 'todos' || b.status === statusFilter;
    return matchUnit && matchStatus;
  });

  const availableCount = beds.filter((b) => b.status === 'disponible').length;

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle2">Camas disponibles: </Typography>
        <Chip label={availableCount} size="small" color="success" variant="filled" />
        <TextField select size="small" label="Unidad" value={unitFilter} onChange={(e) => setUnitFilter(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="todas">Todas</MenuItem>
          {units.map((u) => (
            <MenuItem key={u} value={u}>{u}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip label="Todos" size="small" color={statusFilter === 'todos' ? 'primary' : 'default'} variant={statusFilter === 'todos' ? 'filled' : 'outlined'} onClick={() => setStatusFilter('todos')} sx={{ cursor: 'pointer' }} />
          {(Object.keys(STATUS_LABELS) as Bed['status'][]).map((s) => (
            <Chip key={s} label={STATUS_LABELS[s]} size="small" color={statusFilter === s ? 'primary' : 'default'} variant={statusFilter === s ? 'filled' : 'outlined'} onClick={() => setStatusFilter(s)} sx={{ cursor: 'pointer' }} />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Habitación</TableCell>
            <TableCell>Unidad</TableCell>
            <TableCell>Piso</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Fecha ingreso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.code}</TableCell>
              <TableCell>{b.room}</TableCell>
              <TableCell>{b.unit}</TableCell>
              <TableCell>{b.floor ?? '—'}</TableCell>
              <TableCell>
                <Chip label={STATUS_LABELS[b.status]} size="small" color={STATUS_COLORS[b.status]} variant="outlined" />
              </TableCell>
              <TableCell>{b.patientName ?? '—'}</TableCell>
              <TableCell>{b.admissionDate ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay camas que coincidan con los filtros.
        </Typography>
      )}
    </Box>
  );
}
