import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { SurgicalSchedule } from '../types';

interface SurgicalScheduleProps {
  schedules: SurgicalSchedule[];
}

const STATUS_LABELS: Record<string, string> = {
  programada: 'Programada',
  en_curso: 'En curso',
  completada: 'Completada',
  cancelada: 'Cancelada',
};

const STATUS_COLORS: Record<string, 'info' | 'warning' | 'success' | 'default'> = {
  programada: 'info',
  en_curso: 'warning',
  completada: 'success',
  cancelada: 'default',
};

export default function SurgicalSchedule({ schedules }: SurgicalScheduleProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [dateFilter, setDateFilter] = useState('');

  const filtered = schedules.filter((s) => {
    const matchSearch =
      !search ||
      s.patientName.toLowerCase().includes(search.toLowerCase()) ||
      s.procedure.toLowerCase().includes(search.toLowerCase()) ||
      s.surgeon.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || s.status === statusFilter;
    const matchDate = !dateFilter || s.date === dateFilter;
    return matchSearch && matchStatus && matchDate;
  });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Programación de cirugías ambulatorias. Quirófanos y horarios.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente, procedimiento o cirujano"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
        <TextField
          size="small"
          label="Fecha"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
        />
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip
            label="Todos"
            size="small"
            color={statusFilter === 'todos' ? 'primary' : 'default'}
            variant={statusFilter === 'todos' ? 'filled' : 'outlined'}
            onClick={() => setStatusFilter('todos')}
            sx={{ cursor: 'pointer' }}
          />
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((s) => (
            <Chip
              key={s}
              label={STATUS_LABELS[s]}
              size="small"
              color={statusFilter === s ? 'primary' : 'default'}
              variant={statusFilter === s ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter(s)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Procedimiento</TableCell>
            <TableCell>Cirujano</TableCell>
            <TableCell>Quirófano</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{formatDate(s.date)}</TableCell>
              <TableCell>{s.time}</TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {s.patientName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {s.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{s.procedure}</TableCell>
              <TableCell>{s.surgeon}</TableCell>
              <TableCell>{s.room}</TableCell>
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
          No hay cirugías programadas.
        </Typography>
      )}
    </Box>
  );
}
