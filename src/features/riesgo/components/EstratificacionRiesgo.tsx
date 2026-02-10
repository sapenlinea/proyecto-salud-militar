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
import type { EstratificacionRiesgo } from '../types';

interface EstratificacionRiesgoProps {
  items: EstratificacionRiesgo[];
}

const RISK_LABELS: Record<string, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
  muy_alto: 'Muy alto',
};

const RISK_COLORS: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
  bajo: 'success',
  medio: 'info',
  alto: 'warning',
  muy_alto: 'error',
};

export default function EstratificacionRiesgoSection({ items }: EstratificacionRiesgoProps) {
  const [levelFilter, setLevelFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = items.filter((i) => {
    const matchLevel = levelFilter === 'todos' || i.riskLevel === levelFilter;
    const matchSearch =
      !search ||
      i.patientName.toLowerCase().includes(search.toLowerCase()) ||
      i.patientDocument.includes(search);
    return matchLevel && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Estratificación de riesgo por paciente. Niveles y factores de riesgo.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente o documento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          size="small"
          label="Nivel de riesgo"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(RISK_LABELS) as Array<keyof typeof RISK_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {RISK_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell align="center">Nivel</TableCell>
            <TableCell align="right">Puntaje</TableCell>
            <TableCell>Fecha estratificación</TableCell>
            <TableCell>Próxima revisión</TableCell>
            <TableCell>Factores de riesgo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((i) => (
            <TableRow key={i.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {i.patientName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {i.patientDocument}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={RISK_LABELS[i.riskLevel] ?? i.riskLevel}
                  size="small"
                  color={RISK_COLORS[i.riskLevel] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">{i.score}</TableCell>
              <TableCell>{i.stratificationDate}</TableCell>
              <TableCell>{i.nextReviewDate ?? '—'}</TableCell>
              <TableCell>
                {i.riskFactors.length > 0 ? i.riskFactors.join(', ') : '—'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay registros de estratificación.
        </Typography>
      )}
    </Box>
  );
}
