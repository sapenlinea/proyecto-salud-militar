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
import type { StaffMember } from '../types';

interface StaffRegistryProps {
  staff: StaffMember[];
}

export default function StaffRegistry({ staff }: StaffRegistryProps) {
  const [search, setSearch] = useState('');

  const filtered = staff.filter(
    (s) =>
      !search ||
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.documentNumber.includes(search) ||
      s.profession.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Buscar personal"
          placeholder="Documento, nombre o profesión"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 280 }}
        />
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Documento</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Profesión</TableCell>
            <TableCell>Especialidad</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Fecha ingreso</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.documentNumber}</TableCell>
              <TableCell>{s.fullName}</TableCell>
              <TableCell>{s.profession}</TableCell>
              <TableCell>{s.specialty ?? '—'}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{formatDate(s.hireDate)}</TableCell>
              <TableCell>
                <Chip
                  label={s.active ? 'Activo' : 'Inactivo'}
                  size="small"
                  color={s.active ? 'success' : 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No se encontró personal.
        </Typography>
      )}
    </Box>
  );
}
