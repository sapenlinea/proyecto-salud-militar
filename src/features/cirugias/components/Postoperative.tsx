import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Postoperative } from '../types';

interface PostoperativeProps {
  postoperatives: Postoperative[];
}

export default function Postoperative({ postoperatives }: PostoperativeProps) {
  const [search, setSearch] = useState('');

  const filtered = postoperatives.filter(
    (p) =>
      !search ||
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.procedure.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.followUpDate).getTime() - new Date(a.followUpDate).getTime()
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Seguimiento postoperatorio y controles.
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente o procedimiento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Procedimiento</TableCell>
            <TableCell>Fecha cirugía</TableCell>
            <TableCell>Fecha control</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Complicaciones</TableCell>
            <TableCell>Responsable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.patientName}</TableCell>
              <TableCell>{p.procedure}</TableCell>
              <TableCell>{formatDate(p.surgeryDate)}</TableCell>
              <TableCell>{formatDate(p.followUpDate)}</TableCell>
              <TableCell>{p.status}</TableCell>
              <TableCell sx={{ maxWidth: 180 }}>{p.complications ?? '—'}</TableCell>
              <TableCell>{p.responsible}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay registros postoperatorios.
        </Typography>
      )}
    </Box>
  );
}
