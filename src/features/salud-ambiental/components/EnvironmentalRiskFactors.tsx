import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { EnvironmentalRiskFactor } from '../types';

interface EnvironmentalRiskFactorsProps {
  riskFactors: EnvironmentalRiskFactor[];
}

const LEVEL_LABELS: Record<string, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
};

const LEVEL_COLORS: Record<string, 'success' | 'warning' | 'error'> = {
  bajo: 'success',
  medio: 'warning',
  alto: 'error',
};

const STATUS_LABELS: Record<string, string> = {
  activo: 'Activo',
  en_control: 'En control',
  mitigado: 'Mitigado',
};

export default function EnvironmentalRiskFactors({ riskFactors }: EnvironmentalRiskFactorsProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  const categories = ['todos', ...Array.from(new Set(riskFactors.map((r) => r.category)))];
  const filtered =
    categoryFilter === 'todos'
      ? riskFactors
      : riskFactors.filter((r) => r.category === categoryFilter);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'short' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Factores de riesgo ambiental identificados en la zona de vigilancia.
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat === 'todos' ? 'Todos' : cat}
            size="small"
            color={categoryFilter === cat ? 'primary' : 'default'}
            variant={categoryFilter === cat ? 'filled' : 'outlined'}
            onClick={() => setCategoryFilter(cat)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Categoría</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Ubicación</TableCell>
            <TableCell>Nivel</TableCell>
            <TableCell>Fecha detección</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.category}</TableCell>
              <TableCell>{r.description}</TableCell>
              <TableCell>{r.location}</TableCell>
              <TableCell>
                <Chip
                  label={LEVEL_LABELS[r.level] ?? r.level}
                  size="small"
                  color={LEVEL_COLORS[r.level] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{formatDate(r.detectedAt)}</TableCell>
              <TableCell>{STATUS_LABELS[r.status] ?? r.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay factores de riesgo ambiental.
        </Typography>
      )}
    </Box>
  );
}
