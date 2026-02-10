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
import type { RiesgoLaboral } from '../types';

interface RiesgosLaboralesProps {
  riesgos: RiesgoLaboral[];
}

const TYPE_LABELS: Record<string, string> = {
  biologico: 'Biológico',
  quimico: 'Químico',
  fisico: 'Físico',
  ergonomico: 'Ergonómico',
  psicosocial: 'Psicosocial',
};

const LEVEL_LABELS: Record<string, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
  critico: 'Crítico',
};

const LEVEL_COLORS: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
  bajo: 'success',
  medio: 'info',
  alto: 'warning',
  critico: 'error',
};

export default function RiesgosLaborales({ riesgos }: RiesgosLaboralesProps) {
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [levelFilter, setLevelFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = riesgos.filter((r) => {
    const matchType = typeFilter === 'todos' || r.riskType === typeFilter;
    const matchLevel = levelFilter === 'todos' || r.level === levelFilter;
    const matchSearch =
      !search ||
      r.area.toLowerCase().includes(search.toLowerCase()) ||
      r.position.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchLevel && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Riesgos laborales por área y cargo. Evaluación y controles.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Área, cargo o descripción"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
        />
        <TextField
          select
          size="small"
          label="Tipo riesgo"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(TYPE_LABELS) as Array<keyof typeof TYPE_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {TYPE_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Nivel"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(LEVEL_LABELS) as Array<keyof typeof LEVEL_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {LEVEL_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Área</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Nivel</TableCell>
            <TableCell>Controles</TableCell>
            <TableCell>Última actualización</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.area}</TableCell>
              <TableCell>{r.position}</TableCell>
              <TableCell>{TYPE_LABELS[r.riskType] ?? r.riskType}</TableCell>
              <TableCell sx={{ maxWidth: 220 }}>{r.description}</TableCell>
              <TableCell>
                <Chip
                  label={LEVEL_LABELS[r.level] ?? r.level}
                  size="small"
                  color={LEVEL_COLORS[r.level] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 220 }}>{r.controls}</TableCell>
              <TableCell>{r.lastUpdate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay riesgos laborales registrados.
        </Typography>
      )}
    </Box>
  );
}
