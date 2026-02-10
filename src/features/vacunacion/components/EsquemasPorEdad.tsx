import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { EsquemaPorEdad } from '../types';

interface EsquemasPorEdadProps {
  esquemas: EsquemaPorEdad[];
}

function formatAge(days: number): string {
  if (days < 365) return `${Math.floor(days / 30)} meses`;
  return `${Math.floor(days / 365)} años`;
}

export default function EsquemasPorEdad({ esquemas }: EsquemasPorEdadProps) {
  const [ageFilter, setAgeFilter] = useState<string>('todos');

  const ageGroups = [...new Set(esquemas.map((e) => e.ageGroup))];

  const filtered =
    ageFilter === 'todos'
      ? esquemas
      : esquemas.filter((e) => e.ageGroup === ageFilter);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Esquema de vacunación por edad. Dosis y ventanas de aplicación (PAI).
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          select
          size="small"
          label="Grupo de edad"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {ageGroups.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Grupo edad</TableCell>
            <TableCell>Vacuna</TableCell>
            <TableCell align="center">Dosis</TableCell>
            <TableCell align="right">Edad mínima</TableCell>
            <TableCell align="right">Edad máxima</TableCell>
            <TableCell>Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.ageGroup}</TableCell>
              <TableCell>{e.vaccineName}</TableCell>
              <TableCell align="center">{e.doseNumber}</TableCell>
              <TableCell align="right">{formatAge(e.minAgeDays)}</TableCell>
              <TableCell align="right">{e.maxAgeDays ? formatAge(e.maxAgeDays) : '—'}</TableCell>
              <TableCell>{e.description ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay esquemas configurados.
        </Typography>
      )}
    </Box>
  );
}
