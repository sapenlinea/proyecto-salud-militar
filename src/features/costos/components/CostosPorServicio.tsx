import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { CostoPorServicio } from '../types';

interface CostosPorServicioProps {
  costs: CostoPorServicio[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

export default function CostosPorServicio({ costs }: CostosPorServicioProps) {
  const [periodFilter, setPeriodFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  const categories = [...new Set(costs.map((c) => c.category))];

  const filtered = costs.filter((c) => {
    const matchPeriod = !periodFilter || c.period === periodFilter;
    const matchCategory = categoryFilter === 'todos' || c.category === categoryFilter;
    return matchPeriod && matchCategory;
  });

  const totalCost = filtered.reduce((sum, c) => sum + c.totalCost, 0);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Costos por servicio prestado. Análisis por categoría y período.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Período"
          type="month"
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 160 }}
        />
        <TextField
          select
          size="small"
          label="Categoría"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell align="right">Costo unitario</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Costo total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.serviceCode}</TableCell>
              <TableCell>{c.serviceName}</TableCell>
              <TableCell>{c.category}</TableCell>
              <TableCell align="right">{formatCurrency(c.unitCost)}</TableCell>
              <TableCell align="right">{c.totalExecuted}</TableCell>
              <TableCell align="right">{formatCurrency(c.totalCost)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="subtitle2">
            Total: {formatCurrency(totalCost)}
          </Typography>
        </Box>
      )}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay registros de costos.
        </Typography>
      )}
    </Box>
  );
}
