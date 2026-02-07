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
import type { InventoryItem } from '../types.js';

interface InventorySectionProps {
  items: InventoryItem[];
}

function getStockStatus(item: InventoryItem): 'bajo' | 'normal' | 'alto' {
  if (item.totalQuantity <= item.minStock) return 'bajo';
  if (item.maxStock && item.totalQuantity >= item.maxStock) return 'alto';
  return 'normal';
}

export default function InventorySection({ items }: InventorySectionProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'todos' | 'bajo'>('todos');

  const filtered = items.filter((item) => {
    const matchSearch =
      !search ||
      item.medication.name.toLowerCase().includes(search.toLowerCase()) ||
      item.medication.code.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'todos' || getStockStatus(item) === 'bajo';
    return matchSearch && matchFilter;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar medicamento"
          placeholder="Código o nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {(['todos', 'bajo'] as const).map((f) => (
            <Chip
              key={f}
              label={f === 'bajo' ? 'Stock bajo' : 'Todos'}
              size="small"
              color={filter === f ? 'primary' : 'default'}
              variant={filter === f ? 'filled' : 'outlined'}
              onClick={() => setFilter(f)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Medicamento</TableCell>
            <TableCell>Presentación</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Mínimo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Lotes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((item) => {
            const status = getStockStatus(item);
            return (
              <TableRow key={item.id}>
                <TableCell>{item.medication.code}</TableCell>
                <TableCell>{item.medication.name}</TableCell>
                <TableCell>{item.medication.presentation}</TableCell>
                <TableCell>{item.totalQuantity} {item.medication.unit}s</TableCell>
                <TableCell>{item.minStock}</TableCell>
                <TableCell>
                  <Chip
                    label={status === 'bajo' ? 'Bajo' : status === 'alto' ? 'Alto' : 'Normal'}
                    size="small"
                    color={status === 'bajo' ? 'error' : status === 'alto' ? 'warning' : 'success'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{item.lots.length} lotes</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay medicamentos en inventario.
        </Typography>
      )}
    </Box>
  );
}
