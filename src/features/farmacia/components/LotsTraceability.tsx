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
import type { Lot } from '../types.js';

interface LotsTraceabilityProps {
  lots: Lot[];
  medicationName?: (medicationId: string) => string;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-CO', { dateStyle: 'medium' });
  } catch {
    return iso;
  }
}

function daysToExpire(expirationDate: string): number {
  try {
    const exp = new Date(expirationDate);
    const now = new Date();
    return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}

export default function LotsTraceability({ lots, medicationName }: LotsTraceabilityProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'todos' | 'vencimiento'>('todos');

  const filtered = lots.filter((l) => {
    const matchSearch =
      !search ||
      l.lotNumber.toLowerCase().includes(search.toLowerCase()) ||
      (medicationName && medicationName(l.medicationId).toLowerCase().includes(search.toLowerCase()));
    const days = daysToExpire(l.expirationDate);
    const matchFilter = filter === 'todos' || days <= 180;
    return matchSearch && matchFilter;
  });

  const sorted = [...filtered].sort((a, b) => daysToExpire(a.expirationDate) - daysToExpire(b.expirationDate));

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar por lote o medicamento"
          placeholder="Número de lote"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {(['todos', 'vencimiento'] as const).map((f) => (
            <Chip
              key={f}
              label={f === 'vencimiento' ? 'Próximos a vencer (≤6 meses)' : 'Todos'}
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
            <TableCell>Lote</TableCell>
            <TableCell>Medicamento</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>F. fabricación</TableCell>
            <TableCell>F. vencimiento</TableCell>
            <TableCell>Días restantes</TableCell>
            <TableCell>Ubicación</TableCell>
            <TableCell>Proveedor ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((l) => {
            const days = daysToExpire(l.expirationDate);
            const severity = days <= 30 ? 'crítico' : days <= 90 ? 'alerta' : days <= 180 ? 'próximo' : 'normal';
            return (
              <TableRow key={l.id}>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {l.lotNumber}
                  </Typography>
                </TableCell>
                <TableCell>{medicationName ? medicationName(l.medicationId) : l.medicationId}</TableCell>
                <TableCell>{l.quantity}</TableCell>
                <TableCell>{l.manufacturingDate ? formatDate(l.manufacturingDate) : '—'}</TableCell>
                <TableCell>{formatDate(l.expirationDate)}</TableCell>
                <TableCell>
                  <Chip
                    label={`${days} días`}
                    size="small"
                    color={severity === 'crítico' ? 'error' : severity === 'alerta' ? 'warning' : severity === 'próximo' ? 'info' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{l.location ?? '—'}</TableCell>
                <TableCell>{l.supplierId ?? '—'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {sorted.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay lotes registrados.
        </Typography>
      )}
    </Box>
  );
}
