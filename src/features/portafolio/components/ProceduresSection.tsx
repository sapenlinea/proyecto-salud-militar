import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Procedure } from '../types.js';

interface ProceduresSectionProps {
  procedures: Procedure[];
}

export default function ProceduresSection({ procedures }: ProceduresSectionProps) {
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('todas');

  const specialties = useMemo(() => Array.from(new Set(procedures.map((p) => p.specialtyName ?? ''))).filter(Boolean).sort(), [procedures]);

  const filtered = useMemo(
    () =>
      procedures.filter((proc) => {
        const matchSearch =
          !search.trim() ||
          proc.code.toLowerCase().includes(search.toLowerCase()) ||
          proc.name.toLowerCase().includes(search.toLowerCase());
        const matchSpecialty = specialtyFilter === 'todas' || proc.specialtyName === specialtyFilter;
        return matchSearch && matchSpecialty;
      }),
    [procedures, search, specialtyFilter]
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField size="small" label="Buscar" placeholder="Código o nombre" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ minWidth: 220 }} />
        <TextField select size="small" label="Especialidad" value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} sx={{ minWidth: 180 }}>
          <MenuItem value="todas">Todas</MenuItem>
          {specialties.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Especialidad</TableCell>
            <TableCell>Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((proc) => (
            <TableRow key={proc.id}>
              <TableCell>{proc.code}</TableCell>
              <TableCell>{proc.name}</TableCell>
              <TableCell>{proc.specialtyName ?? '—'}</TableCell>
              <TableCell>{proc.description ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay procedimientos que coincidan con los filtros.
        </Typography>
      )}
    </Box>
  );
}
