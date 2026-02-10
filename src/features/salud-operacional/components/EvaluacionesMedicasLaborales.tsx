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
import type { EvaluacionMedicaLaboral } from '../types';

interface EvaluacionesMedicasLaboralesProps {
  evaluaciones: EvaluacionMedicaLaboral[];
}

const TYPE_LABELS: Record<string, string> = {
  ingreso: 'Ingreso',
  periodica: 'Periódica',
  retiro: 'Retiro',
  post_incapacidad: 'Post incapacidad',
};

const RESULT_LABELS: Record<string, string> = {
  apto: 'Apto',
  apto_con_restricciones: 'Apto con restricciones',
  no_apto: 'No apto',
};

const RESULT_COLORS: Record<string, 'success' | 'warning' | 'error'> = {
  apto: 'success',
  apto_con_restricciones: 'warning',
  no_apto: 'error',
};

export default function EvaluacionesMedicasLaborales({ evaluaciones }: EvaluacionesMedicasLaboralesProps) {
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [resultFilter, setResultFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = evaluaciones.filter((e) => {
    const matchType = typeFilter === 'todos' || e.evaluationType === typeFilter;
    const matchResult = resultFilter === 'todos' || e.result === resultFilter;
    const matchSearch =
      !search ||
      e.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      e.employeeDocument.includes(search) ||
      e.position.toLowerCase().includes(search.toLowerCase()) ||
      e.area.toLowerCase().includes(search.toLowerCase());
    return matchType && matchResult && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Evaluaciones médicas laborales. Ingreso, periódicas, retiro y post incapacidad.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Empleado, cargo o área"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
        <TextField
          select
          size="small"
          label="Tipo"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 170 }}
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
          label="Resultado"
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(RESULT_LABELS) as Array<keyof typeof RESULT_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {RESULT_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Empleado</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Área</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Resultado</TableCell>
            <TableCell>Evaluó</TableCell>
            <TableCell>Próxima evaluación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.evaluationDate}</TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {e.employeeName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {e.employeeDocument}
                </Typography>
              </TableCell>
              <TableCell>{e.position}</TableCell>
              <TableCell>{e.area}</TableCell>
              <TableCell>{TYPE_LABELS[e.evaluationType] ?? e.evaluationType}</TableCell>
              <TableCell>
                <Chip
                  label={RESULT_LABELS[e.result] ?? e.result}
                  size="small"
                  color={RESULT_COLORS[e.result] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{e.evaluator}</TableCell>
              <TableCell>{e.nextEvaluationDate ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay evaluaciones médicas laborales.
        </Typography>
      )}
    </Box>
  );
}
