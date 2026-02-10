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
import type { ValidacionMedica } from '../types';

interface ValidacionMedicaProps {
  validaciones: ValidacionMedica[];
}

const STATUS_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  validado: 'Validado',
  observaciones: 'Observaciones',
};

const STATUS_COLORS: Record<string, 'default' | 'success' | 'warning'> = {
  pendiente: 'default',
  validado: 'success',
  observaciones: 'warning',
};

export default function ValidacionMedicaSection({ validaciones }: ValidacionMedicaProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = validaciones.filter((v) => {
    const matchStatus = statusFilter === 'todos' || v.status === statusFilter;
    const matchSearch =
      !search ||
      v.patientName.toLowerCase().includes(search.toLowerCase()) ||
      v.patientDocument.includes(search) ||
      v.studyName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Validación médica de resultados. Revisión y aprobación por médico.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente o estudio"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          size="small"
          label="Estado"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {STATUS_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Estudio</TableCell>
            <TableCell>Fecha validación</TableCell>
            <TableCell>Validó</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Observaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((v) => (
            <TableRow key={v.id}>
              <TableCell>
                <Typography variant="body2">{v.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {v.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{v.studyName}</TableCell>
              <TableCell>{v.validationDate || '—'}</TableCell>
              <TableCell>{v.validatedBy || '—'}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[v.status] ?? v.status}
                  size="small"
                  color={STATUS_COLORS[v.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 240 }}>{v.observations ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay validaciones.
        </Typography>
      )}
    </Box>
  );
}
