import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { PypFollowUp } from '../types';

interface FollowUpProps {
  followUps: PypFollowUp[];
}

export default function FollowUp({ followUps }: FollowUpProps) {
  const [programFilter, setProgramFilter] = useState<string>('todos');

  const programIds = Array.from(new Set(followUps.map((f) => f.programId)));
  const programNames = Object.fromEntries(
    followUps.map((f) => [f.programId, f.programName])
  );

  const filtered =
    programFilter === 'todos'
      ? followUps
      : followUps.filter((f) => f.programId === programFilter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Seguimiento de los programas PYP. Acciones realizadas y próximos pasos.
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
        <Chip
          label="Todos"
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Programa</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Notas</TableCell>
            <TableCell>Responsable</TableCell>
            <TableCell>Próxima acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{formatDate(f.date)}</TableCell>
              <TableCell>{f.programName}</TableCell>
              <TableCell>{f.type}</TableCell>
              <TableCell sx={{ maxWidth: 280 }}>{f.notes}</TableCell>
              <TableCell>{f.responsible}</TableCell>
              <TableCell>{f.nextAction ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay seguimientos registrados.
        </Typography>
      )}
    </Box>
  );
}
