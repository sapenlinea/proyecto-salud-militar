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
import type { Supplier } from '../types.js';

interface SuppliersSectionProps {
  suppliers: Supplier[];
}

export default function SuppliersSection({ suppliers }: SuppliersSectionProps) {
  const [search, setSearch] = useState('');

  const filtered = suppliers.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      (s.nit && s.nit.includes(search)) ||
      (s.contactPerson && s.contactPerson.toLowerCase().includes(q))
    );
  });

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Buscar proveedor"
          placeholder="Código, nombre, NIT o contacto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 280 }}
        />
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>NIT</TableCell>
            <TableCell>Contacto</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Ciudad</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.code}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.nit ?? '—'}</TableCell>
              <TableCell>{s.contactPerson ?? '—'}</TableCell>
              <TableCell>{s.phone ?? '—'}</TableCell>
              <TableCell>{s.city ?? '—'}</TableCell>
              <TableCell>
                <Chip
                  label={s.isActive ? 'Activo' : 'Inactivo'}
                  size="small"
                  color={s.isActive ? 'success' : 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay proveedores registrados.
        </Typography>
      )}
    </Box>
  );
}
