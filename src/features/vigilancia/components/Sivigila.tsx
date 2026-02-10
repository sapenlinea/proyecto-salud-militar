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
import type { SivigilaCase } from '../types';

interface SivigilaProps {
  cases: SivigilaCase[];
}

export default function Sivigila({ cases }: SivigilaProps) {
  const [search, setSearch] = useState('');

  const filtered = cases.filter(
    (c) =>
      !search ||
      c.sivigilaId.toLowerCase().includes(search.toLowerCase()) ||
      c.eventCode.toLowerCase().includes(search.toLowerCase()) ||
      c.patientName.toLowerCase().includes(search.toLowerCase()) ||
      c.patientDocument.includes(search)
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Casos reportados al Sistema de Vigilancia en Salud Pública (SIVIGILA).
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="ID SIVIGILA, código evento, paciente o documento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 320 }}
        />
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID SIVIGILA</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Evento</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Fecha notificación</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fuente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {c.sivigilaId}
                </Typography>
              </TableCell>
              <TableCell>{c.eventCode}</TableCell>
              <TableCell>{c.eventName}</TableCell>
              <TableCell>{c.patientDocument}</TableCell>
              <TableCell>{c.patientName}</TableCell>
              <TableCell>{formatDate(c.notificationDate)}</TableCell>
              <TableCell>{c.status}</TableCell>
              <TableCell>{c.source}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay casos SIVIGILA.
        </Typography>
      )}
    </Box>
  );
}
