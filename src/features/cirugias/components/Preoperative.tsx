import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Preoperative } from '../types';

interface PreoperativeProps {
  preoperatives: Preoperative[];
}

const CLEARANCE_LABELS: Record<string, string> = {
  apto: 'Apto',
  apto_con_observaciones: 'Apto con observaciones',
  no_apto: 'No apto',
};

const CLEARANCE_COLORS: Record<string, 'success' | 'warning' | 'error'> = {
  apto: 'success',
  apto_con_observaciones: 'warning',
  no_apto: 'error',
};

export default function Preoperative({ preoperatives }: PreoperativeProps) {
  const [search, setSearch] = useState('');

  const filtered = preoperatives.filter(
    (p) =>
      !search ||
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.procedure.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Valoración preoperatoria y autorización anestésica.
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente o procedimiento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Procedimiento</TableCell>
            <TableCell>Anestesiológico</TableCell>
            <TableCell>Resultados lab</TableCell>
            <TableCell>Concepto</TableCell>
            <TableCell>Observaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{formatDate(p.date)}</TableCell>
              <TableCell>{p.patientName}</TableCell>
              <TableCell>{p.procedure}</TableCell>
              <TableCell>{p.anesthesiologist}</TableCell>
              <TableCell sx={{ maxWidth: 180 }}>{p.labResults ?? '—'}</TableCell>
              <TableCell>
                <Chip
                  label={CLEARANCE_LABELS[p.clearance] ?? p.clearance}
                  size="small"
                  color={CLEARANCE_COLORS[p.clearance] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 200 }}>{p.notes ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay valoraciones preoperatorias.
        </Typography>
      )}
    </Box>
  );
}
