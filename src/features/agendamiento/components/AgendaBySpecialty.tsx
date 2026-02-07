import { useMemo, useState } from 'react';
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
import type { Appointment, Specialty } from '../types.js';

interface AgendaBySpecialtyProps {
  specialties: Specialty[];
  appointments: Appointment[];
  onConfirm?: (appointmentId: string) => void;
  onCancel?: (appointmentId: string) => void;
}

const STATUS_LABELS: Record<Appointment['status'], string> = {
  programada: 'Programada',
  confirmada: 'Confirmada',
  cancelada: 'Cancelada',
  completada: 'Completada',
  no_asistio: 'No asistió',
};

const STATUS_COLORS: Record<Appointment['status'], 'default' | 'primary' | 'success' | 'error' | 'warning'> = {
  programada: 'default',
  confirmada: 'primary',
  cancelada: 'error',
  completada: 'success',
  no_asistio: 'warning',
};

export default function AgendaBySpecialty({ specialties, appointments, onConfirm, onCancel }: AgendaBySpecialtyProps) {
  const [specialtyId, setSpecialtyId] = useState<string>(specialties[0]?.id ?? '');

  const filtered = useMemo(
    () => appointments.filter((apt) => apt.specialtyId === specialtyId && apt.status !== 'cancelada'),
    [appointments, specialtyId]
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField select size="small" label="Especialidad" value={specialtyId} onChange={(e) => setSpecialtyId(e.target.value)} sx={{ minWidth: 220 }}>
          {specialties.map((s) => (
            <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Profesional</TableCell>
            <TableCell>Motivo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((apt) => (
            <TableRow key={apt.id}>
              <TableCell>{apt.date}</TableCell>
              <TableCell>{apt.time}</TableCell>
              <TableCell>{apt.patientName}</TableCell>
              <TableCell>{apt.professionalName}</TableCell>
              <TableCell>{apt.reason ?? '—'}</TableCell>
              <TableCell>
                <Chip label={STATUS_LABELS[apt.status]} size="small" color={STATUS_COLORS[apt.status]} variant="outlined" />
              </TableCell>
              <TableCell align="right">
                {apt.status === 'programada' && (
                  <Chip label="Confirmar" size="small" color="primary" variant="outlined" onClick={() => onConfirm?.(apt.id)} sx={{ mr: 0.5, cursor: 'pointer' }} />
                )}
                {(apt.status === 'programada' || apt.status === 'confirmada') && (
                  <Chip label="Cancelar" size="small" color="error" variant="outlined" onClick={() => onCancel?.(apt.id)} sx={{ cursor: 'pointer' }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay citas para esta especialidad.
        </Typography>
      )}
    </Box>
  );
}
