import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { IndicadorCAC } from '../types';

interface IndicadoresCACProps {
  indicadores: IndicadorCAC[];
}

function formatValue(value: number, unit: string): string {
  if (unit === 'COP') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  return `${value} ${unit}`;
}

const CATEGORY_LABELS: Record<string, string> = {
  gestion: 'Gestión',
  cobertura: 'Cobertura',
  calidad: 'Calidad',
  costo: 'Costo',
};

export default function IndicadoresCAC({ indicadores }: IndicadoresCACProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [periodFilter, setPeriodFilter] = useState<string>('todos');

  const periods = [...new Set(indicadores.map((i) => i.period))];

  const filtered = indicadores.filter((i) => {
    const matchCategory = categoryFilter === 'todos' || i.category === categoryFilter;
    const matchPeriod = periodFilter === 'todos' || i.period === periodFilter;
    return matchCategory && matchPeriod;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Indicadores del programa CAC. Gestión, cobertura, calidad y costo.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          select
          size="small"
          label="Categoría"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {CATEGORY_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Período"
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {periods.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {filtered.map((i) => (
          <Card key={i.id} variant="outlined" sx={{ minWidth: 200, maxWidth: 280 }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                {i.name} · {CATEGORY_LABELS[i.category] ?? i.category}
              </Typography>
              <Typography variant="h5" fontWeight={600} sx={{ mt: 0.5 }}>
                {formatValue(i.value, i.unit)}
              </Typography>
              {i.target != null && (
                <Typography variant="body2" color="text.secondary">
                  Meta: {formatValue(i.target, i.unit)} · Período: {i.period}
                </Typography>
              )}
              {i.target == null && (
                <Typography variant="body2" color="text.secondary">
                  Período: {i.period}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay indicadores.
        </Typography>
      )}
    </Box>
  );
}
