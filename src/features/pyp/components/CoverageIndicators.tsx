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
import type { CoverageIndicator } from '../types';

interface CoverageIndicatorsProps {
  indicators: CoverageIndicator[];
}

export default function CoverageIndicators({ indicators }: CoverageIndicatorsProps) {
  const [programFilter, setProgramFilter] = useState<string>('todos');

  const programIds = Array.from(new Set(indicators.map((i) => i.programId)));
  const programNames = Object.fromEntries(
    indicators.map((i) => [i.programId, i.programName])
  );

  const filtered =
    programFilter === 'todos'
      ? indicators
      : indicators.filter((i) => i.programId === programFilter);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Indicadores de cobertura de los programas PYP. Meta vs logrado.
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
            <TableCell>Indicador</TableCell>
            <TableCell>Meta</TableCell>
            <TableCell>Logrado</TableCell>
            <TableCell>Unidad</TableCell>
            <TableCell>% Cobertura</TableCell>
            <TableCell>Avance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((i) => {
            const meetsTarget = i.percentage >= 85;
            return (
              <TableRow key={i.id}>
                <TableCell>{i.programName}</TableCell>
                <TableCell sx={{ maxWidth: 250 }}>{i.indicator}</TableCell>
                <TableCell>{i.target.toLocaleString('es-CO')}</TableCell>
                <TableCell>{i.achieved.toLocaleString('es-CO')}</TableCell>
                <TableCell>{i.unit}</TableCell>
                <TableCell>
                  <Chip
                    label={`${i.percentage.toFixed(1)}%`}
                    size="small"
                    color={meetsTarget ? 'success' : 'warning'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell sx={{ minWidth: 120 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(i.percentage, 100)}
                    sx={{ height: 8, borderRadius: 1 }}
                    color={meetsTarget ? 'success' : 'primary'}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay indicadores de cobertura.
        </Typography>
      )}
    </Box>
  );
}
