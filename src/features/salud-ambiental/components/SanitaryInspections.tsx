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
import type { SanitaryInspection } from '../types';

interface SanitaryInspectionsProps {
  inspections: SanitaryInspection[];
}

const STATUS_LABELS: Record<string, string> = {
  cumple: 'Cumple',
  cumple_parcial: 'Cumple parcial',
  no_cumple: 'No cumple',
};

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'error'> = {
  cumple: 'success',
  cumple_parcial: 'warning',
  no_cumple: 'error',
};

export default function SanitaryInspections({ inspections }: SanitaryInspectionsProps) {
  const [search, setSearch] = useState('');

  const filtered = inspections.filter(
    (i) =>
      !search ||
      i.establishment.toLowerCase().includes(search.toLowerCase()) ||
      i.type.toLowerCase().includes(search.toLowerCase()) ||
      i.address.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Establecimiento, tipo o dirección"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 280 }}
        />
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Establecimiento</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Inspector</TableCell>
            <TableCell>Puntuación</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Hallazgos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((i) => (
            <TableRow key={i.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {i.establishment}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {i.address}
                </Typography>
              </TableCell>
              <TableCell>{i.type}</TableCell>
              <TableCell>{formatDate(i.date)}</TableCell>
              <TableCell>{i.inspector}</TableCell>
              <TableCell>{i.score}/100</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[i.status] ?? i.status}
                  size="small"
                  color={STATUS_COLORS[i.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 250 }}>{i.findings ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay inspecciones sanitarias.
        </Typography>
      )}
    </Box>
  );
}
