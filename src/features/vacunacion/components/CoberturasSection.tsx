import { useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { CoberturaVacunacion } from '../types';

interface CoberturasSectionProps {
  coberturas: CoberturaVacunacion[];
}

function getCoverageColor(pct: number): 'success' | 'warning' | 'error' {
  if (pct >= 95) return 'success';
  if (pct >= 80) return 'warning';
  return 'error';
}

export default function CoberturasSection({ coberturas }: CoberturasSectionProps) {
  const [periodFilter, setPeriodFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState<string>('todos');

  const periods = [...new Set(coberturas.map((c) => c.period))];
  const ageGroups = [...new Set(coberturas.map((c) => c.ageGroup))];

  const filtered = coberturas.filter((c) => {
    const matchPeriod = !periodFilter || c.period === periodFilter;
    const matchAge = ageFilter === 'todos' || c.ageGroup === ageFilter;
    return matchPeriod && matchAge;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Coberturas de vacunación por vacuna y grupo de edad.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          select
          size="small"
          label="Período"
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {periods.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Grupo edad"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          sx={{ minWidth: 140 }}
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
            <TableCell>Vacuna</TableCell>
            <TableCell>Grupo edad</TableCell>
            <TableCell>Período</TableCell>
            <TableCell align="right">Población objetivo</TableCell>
            <TableCell align="right">Vacunados</TableCell>
            <TableCell>Cobertura</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.vaccineName}</TableCell>
              <TableCell>{c.ageGroup}</TableCell>
              <TableCell>{c.period}</TableCell>
              <TableCell align="right">{c.populationTarget}</TableCell>
              <TableCell align="right">{c.vaccinated}</TableCell>
              <TableCell sx={{ minWidth: 180 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(c.coveragePercent, 100)}
                    color={getCoverageColor(c.coveragePercent)}
                    sx={{ flex: 1, height: 8, borderRadius: 1 }}
                  />
                  <Typography variant="body2">{c.coveragePercent.toFixed(1)}%</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay datos de cobertura.
        </Typography>
      )}
    </Box>
  );
}
