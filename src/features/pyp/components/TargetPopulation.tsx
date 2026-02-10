import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { TargetPopulation } from '../types';

interface TargetPopulationSectionProps {
  populations: TargetPopulation[];
}

export default function TargetPopulationSection({ populations }: TargetPopulationSectionProps) {
  const [programFilter, setProgramFilter] = useState<string>('todos');

  const programIds = Array.from(new Set(populations.map((p) => p.programId)));
  const programNames = Object.fromEntries(
    populations.map((p) => [p.programId, p.programName])
  );
  const filtered =
    programFilter === 'todos'
      ? populations
      : populations.filter((p) => p.programId === programFilter);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Población objetivo de cada programa PYP. Registrados vs población estimada.
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
            <TableCell>Programa</TableCell>
            <TableCell>Grupo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Estimada</TableCell>
            <TableCell>Registrados</TableCell>
            <TableCell>Cobertura</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.programName}</TableCell>
              <TableCell>{p.group}</TableCell>
              <TableCell sx={{ maxWidth: 250 }}>{p.description}</TableCell>
              <TableCell>{p.estimatedSize.toLocaleString('es-CO')}</TableCell>
              <TableCell>{p.registeredSize.toLocaleString('es-CO')}</TableCell>
              <TableCell sx={{ minWidth: 120 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(p.coverage ?? 0, 100)}
                    sx={{ flex: 1, height: 8, borderRadius: 1 }}
                    color={p.coverage && p.coverage >= 85 ? 'success' : 'primary'}
                  />
                  <Typography variant="caption">
                    {p.coverage?.toFixed(1) ?? 0}%
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay población objetivo registrada.
        </Typography>
      )}
    </Box>
  );
}
