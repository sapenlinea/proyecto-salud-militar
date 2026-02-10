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
import type { PypProgram } from '../types';

interface ActiveProgramsProps {
  programs: PypProgram[];
}

const STATUS_LABELS: Record<string, string> = {
  activo: 'Activo',
  suspendido: 'Suspendido',
  finalizado: 'Finalizado',
};

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'default'> = {
  activo: 'success',
  suspendido: 'warning',
  finalizado: 'default',
};

export default function ActivePrograms({ programs }: ActiveProgramsProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filtered = programs.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Programas de Promoción y Prevención (PYP) activos en la institución.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar programa"
          placeholder="Código o nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip
            label="Todos"
            size="small"
            color={statusFilter === 'todos' ? 'primary' : 'default'}
            variant={statusFilter === 'todos' ? 'filled' : 'outlined'}
            onClick={() => setStatusFilter('todos')}
            sx={{ cursor: 'pointer' }}
          />
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((s) => (
            <Chip
              key={s}
              label={STATUS_LABELS[s]}
              size="small"
              color={statusFilter === s ? 'primary' : 'default'}
              variant={statusFilter === s ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter(s)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Programa</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Inicio</TableCell>
            <TableCell>Fin</TableCell>
            <TableCell>Responsable</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.code}</TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {p.name}
                </Typography>
              </TableCell>
              <TableCell sx={{ maxWidth: 250 }}>{p.description}</TableCell>
              <TableCell>{formatDate(p.startDate)}</TableCell>
              <TableCell>{p.endDate ? formatDate(p.endDate) : '—'}</TableCell>
              <TableCell>{p.responsible}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[p.status] ?? p.status}
                  size="small"
                  color={STATUS_COLORS[p.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay programas que coincidan con el filtro.
        </Typography>
      )}
    </Box>
  );
}
