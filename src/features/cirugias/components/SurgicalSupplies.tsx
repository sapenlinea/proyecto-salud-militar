import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { SurgicalSupply } from '../types';

interface SurgicalSuppliesProps {
  supplies: SurgicalSupply[];
}

export default function SurgicalSupplies({ supplies }: SurgicalSuppliesProps) {
  const [search, setSearch] = useState('');

  const filtered = supplies.filter(
    (s) =>
      !search ||
      s.patientName.toLowerCase().includes(search.toLowerCase()) ||
      s.procedure.toLowerCase().includes(search.toLowerCase()) ||
      s.item.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'short' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Insumos e implantes utilizados en cirugías ambulatorias.
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente, procedimiento o insumo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 280 }}
        />
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Procedimiento</TableCell>
            <TableCell>Insumo</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Unidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{formatDate(s.date)}</TableCell>
              <TableCell>{s.patientName}</TableCell>
              <TableCell>{s.procedure}</TableCell>
              <TableCell>{s.item}</TableCell>
              <TableCell>{s.quantity}</TableCell>
              <TableCell>{s.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay insumos registrados.
        </Typography>
      )}
    </Box>
  );
}
