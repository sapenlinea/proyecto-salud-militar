import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Dispensation } from '../types.js';

interface DispensationSectionProps {
  dispensations: Dispensation[];
}

const STATUS_LABELS: Record<Dispensation['status'], string> = {
  pendiente: 'Pendiente',
  parcial: 'Parcial',
  completada: 'Completada',
  cancelada: 'Cancelada',
};

const STATUS_COLORS: Record<Dispensation['status'], 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  pendiente: 'warning',
  parcial: 'info',
  completada: 'success',
  cancelada: 'error',
};

export default function DispensationSection({ dispensations }: DispensationSectionProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'todos' | 'pendiente'>('todos');

  const filtered = dispensations.filter((d) => {
    const matchSearch =
      !search ||
      d.patientName.toLowerCase().includes(search.toLowerCase()) ||
      d.document.includes(search);
    const matchFilter = filter === 'todos' || d.status === 'pendiente';
    return matchSearch && matchFilter;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar paciente"
          placeholder="Documento o nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {(['todos', 'pendiente'] as const).map((f) => (
            <Chip
              key={f}
              label={f === 'pendiente' ? 'Pendientes' : 'Todos'}
              size="small"
              color={filter === f ? 'primary' : 'default'}
              variant={filter === f ? 'filled' : 'outlined'}
              onClick={() => setFilter(f)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      {filtered.map((d) => (
        <Paper key={d.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">
              {d.patientName} · {d.document}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                {d.date} {d.time}
              </Typography>
              <Chip label={STATUS_LABELS[d.status]} size="small" color={STATUS_COLORS[d.status]} variant="outlined" />
            </Box>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Medicamento</TableCell>
                <TableCell>Lote</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Dosis</TableCell>
                <TableCell>Indicaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {d.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.medicationName}</TableCell>
                  <TableCell>{item.lotNumber}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.dosage ?? '—'}</TableCell>
                  <TableCell>{item.instructions ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {d.dispensedBy && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Dispensado por: {d.dispensedBy}
            </Typography>
          )}
        </Paper>
      ))}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay dispensaciones registradas.
        </Typography>
      )}
    </Box>
  );
}
