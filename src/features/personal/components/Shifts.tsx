import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Shift } from '../types';

interface ShiftsProps {
  shifts: Shift[];
}

const SHIFT_TYPE_LABELS: Record<string, string> = {
  mañana: 'Mañana',
  tarde: 'Tarde',
  noche: 'Noche',
  '24h': '24 horas',
};

const SHIFT_TYPE_COLORS: Record<string, 'info' | 'warning' | 'secondary' | 'primary'> = {
  mañana: 'info',
  tarde: 'warning',
  noche: 'secondary',
  '24h': 'primary',
};

export default function Shifts({ shifts }: ShiftsProps) {
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('todos');

  const filtered = shifts.filter((s) => {
    const matchDate = !dateFilter || s.date === dateFilter;
    const matchType = typeFilter === 'todos' || s.type === typeFilter;
    return matchDate && matchType;
  });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Fecha"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 160 }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Tipo turno</InputLabel>
          <Select
            label="Tipo turno"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="mañana">Mañana</MenuItem>
            <MenuItem value="tarde">Tarde</MenuItem>
            <MenuItem value="noche">Noche</MenuItem>
            <MenuItem value="24h">24 horas</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Personal</TableCell>
            <TableCell>Horario</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Área</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{formatDate(s.date)}</TableCell>
              <TableCell>{s.staffName}</TableCell>
              <TableCell>
                {s.startTime} - {s.endTime}
              </TableCell>
              <TableCell>
                <Chip
                  label={SHIFT_TYPE_LABELS[s.type] ?? s.type}
                  size="small"
                  color={SHIFT_TYPE_COLORS[s.type] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{s.area}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay turnos programados.
        </Typography>
      )}
    </Box>
  );
}
