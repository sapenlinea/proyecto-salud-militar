import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { PypActivity } from '../types';

interface ActivitiesProps {
  activities: PypActivity[];
}

export default function Activities({ activities }: ActivitiesProps) {
  const [programFilter, setProgramFilter] = useState<string>('todos');
  const [typeFilter, setTypeFilter] = useState<string>('todos');

  const programIds = Array.from(new Set(activities.map((a) => a.programId)));
  const programNames = Object.fromEntries(
    activities.map((a) => [a.programId, a.programName])
  );
  const types = Array.from(new Set(activities.map((a) => a.type)));

  const filtered = activities.filter((a) => {
    const matchProgram = programFilter === 'todos' || a.programId === programFilter;
    const matchType = typeFilter === 'todos' || a.type === typeFilter;
    return matchProgram && matchType;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Actividades realizadas en el marco de los programas PYP.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip
            label="Todos programas"
            size="small"
            color={programFilter === 'todos' ? 'primary' : 'default'}
            variant={programFilter === 'todos' ? 'filled' : 'outlined'}
            onClick={() => setProgramFilter('todos')}
            sx={{ cursor: 'pointer' }}
          />
          {programIds.map((id) => (
            <Chip
              key={id}
              label={programNames[id] ?? id}
              size="small"
              color={programFilter === id ? 'primary' : 'default'}
              variant={programFilter === id ? 'filled' : 'outlined'}
              onClick={() => setProgramFilter(id)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip
            label="Todos tipos"
            size="small"
            color={typeFilter === 'todos' ? 'primary' : 'default'}
            variant={typeFilter === 'todos' ? 'filled' : 'outlined'}
            onClick={() => setTypeFilter('todos')}
            sx={{ cursor: 'pointer' }}
          />
          {types.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              color={typeFilter === t ? 'primary' : 'default'}
              variant={typeFilter === t ? 'filled' : 'outlined'}
              onClick={() => setTypeFilter(t)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Programa</TableCell>
            <TableCell>Actividad</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Participantes</TableCell>
            <TableCell>Responsable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{formatDate(a.date)}</TableCell>
              <TableCell>{a.programName}</TableCell>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.type}</TableCell>
              <TableCell>{a.participants}</TableCell>
              <TableCell>{a.responsible}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay actividades registradas.
        </Typography>
      )}
    </Box>
  );
}
